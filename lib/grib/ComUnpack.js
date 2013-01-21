exports.comunpack = function(data,dataLength,templateNumber,template,numberOfData) {

    var res = []


    var nbitsd=0
    var isign
    var iofst,ival1,ival2,minsd,itemp,non
    var ires = []
    var iresmiss = []
    var gref = []
    var gwidth = []
    var glen = []
    var itype,ngroups,nbitsgref,nbitsgwidth,nbitsglen
    var msng1,msng2
    var ref,bscale,dscale,rmiss1,rmiss2
    var totBit, totLen

    //printf('template: ',(template(j),j=1,16)
    ref = template.referenceValue
//      printf("SAGTref: %f\n",ref);
    bscale = Math.pow(2.0,template.binaryScaleFactor)
    dscale = Math.pow(10.0,-template.decimalScaleFactor)
    nbitsgref = template.bitsUsedForEachPack
    itype = template.typeOfOriginalFieldValues
    ngroups = template.ng
    nbitsgwidth = template.bitsUsedForGroupWidths
    nbitsglen = template.bitsUsedForScaledGroupLengths
    if (templateNumber == 3)
        nbitsd=template.numberOfOctetsRequiredInDataSection*8

    //   Constant field

    if (ngroups == 0) {
        for (j=0;j<numberOfData;j++) res[j]=ref;
        return res
    }

    iofst=0;
    //printf("ALLOC gwidth: %d %x\n",(int)ngroups,gwidth);
//
//  Get missing values, if supplied
//
    if ( template.missingValueManagement == 1 ) {
        rmiss1 = template.primaryMissingValueSubstitute
    }
    if ( template.missingValueManagement == 2 ) {
        rmiss1 = template.primaryMissingValueSubstitute
        rmiss2 = template.secondaryMissingValueSubstitute
    }

    //printf("RMISSs: %f %f %f \n",rmiss1,rmiss2,ref);
// 
//  Extract Spatial differencing values, if using DRS Template 5.3
//
    if (templateNumber == 3) {
        if (nbitsd != 0) {
            ival1 = gbit(data, iofst, nbitsd)
            iofst=iofst+nbitsd
            if (template[16] == 2) {
                ival2 = gbit(data, iofst, nbitsd)
                iofst=iofst+nbitsd
            }
            isign = gbit(data, iofst, 1)
            iofst=iofst+1;
            minsd = gbit(data, iofst, nbitsd-1)
            iofst=iofst+nbitsd-1;
            if (isign == 1) minsd=-minsd;
        }
        else {
            ival1=0;
            ival2=0;
            minsd=0;
        }
    }

    if (nbitsgref != 0) {
        gref = gbits(data,iofst,nbitsgref,0,ngroups);
        itemp=nbitsgref*ngroups;
        iofst=iofst+itemp;
        if (itemp%8 != 0) iofst=iofst+(8-(itemp%8));
    }
    else {
        for (var j=0;j<ngroups;j++)
            gref[j]=0;
    }
//
//  Extract Each Group's bit width
//
    //printf("SAG2: %ld %ld %ld %ld \n",nbitsgwidth,ngroups,iofst,template[10]);
    if (nbitsgwidth != 0) {
        gwidth = gbits(data,iofst,nbitsgwidth,0,ngroups);
        itemp=nbitsgwidth*ngroups;
        iofst=iofst+itemp;
        if (itemp%8 != 0) iofst=iofst+(8-(itemp%8));
    }
    else {
        for (j=0;j<ngroups;j++)
            gwidth[j]=0;
    }

    for (j=0;j<ngroups;j++)
        gwidth[j]=gwidth[j]+template.referenceOfGroupWidths

//
//  Extract Each Group's length (number of values in each group)
//
    if (nbitsglen != 0) {
        glen = gbits(data,iofst,nbitsglen,0,ngroups)
        console.log(glen)
        itemp=nbitsglen*ngroups
        iofst=iofst+itemp;
        if (itemp%8 != 0) iofst=iofst+(8-(itemp%8))
    }
    else {
        for (j=0;j<ngroups;j++)
            glen[j]=0
    }
    for (j=0;j<ngroups;j++)
        glen[j]=(glen[j]*template.lengthIncrementForGroupLengths)+template.referenceForGroupLengths
    glen[ngroups-1]=template.trueLengthOfLastGroup
//
//  Test to see if the group widths and lengths are consistent with number of
//  values, and length of section 7.
//
    totBit = 0
    totLen = 0
    for (j=0;j<ngroups;j++) {
        totBit += (gwidth[j]*glen[j])
        totLen += glen[j]
    }
    if (totLen != numberOfData) {
        return {error: totLen+" != "+numberOfData+" : widths and lengths are inconsistent with number of values"}
    }
    if (totBit / 8. > dataLength) {
        return {error: totBit+" / 8. > "+dataLength+ " : widths and lengths are inconsistent with number of values"}
    }
//
//  For each group, unpack data values
//
    if ( template.missingValueManagement == 0 ) {        // no missing values
        var n=0;
        for (j=0;j<ngroups;j++) {
            if (gwidth[j] != 0) {
                var resTmp = gbits(data,iofst,gwidth[j],0,glen[j])
                ires = ires.concat(resTmp)
                for (var k=0;k<glen[j];k++) {
                    ires[n]=ires[n]+gref[j]
                    n=n+1
                }
            }
            else {
                for (var l=n;l<n+glen[j];l++) ires[l]=gref[j]
                n=n+glen[j]
            }
            iofst=iofst+(gwidth[j]*glen[j])
        }
    }
    else if ( template.missingValueManagement==1 || template.missingValueManagement==2 ) {
        // missing values included
        for (j=0;j<numberOfData;j++) iresmiss[j]=0
        n=0
        non=0
        for (j=0;j<ngroups;j++) {
            if (gwidth[j] != 0) {
                msng1=Math.pow(2.0,gwidth[j])-1
                msng2=msng1-1
                resTmp = gbits(data,iofst,gwidth[j],0,glen[j])
                ires = ires.concat(resTmp)
                iofst=iofst+(gwidth[j]*glen[j])
                for (k=0;k<glen[j];k++) {
                    if (ires[n] == msng1) {
                        iresmiss[n]=1
                    }
                    else if (template.missingValueManagement==2 && ires[n]==msng2) {
                        iresmiss[n]=2
                    }
                    else {
                        iresmiss[n]=0
                        ires[non++]=ires[n]+gref[j]
                    }
                    n++
                }
            }
            else {
                msng1=Math.pow(2.0,nbitsgref)-1
                msng2=msng1-1
                if (gref[j] == msng1) {
                    for (l=n;l<n+glen[j];l++) iresmiss[l]=1
                }
                else if (template.missingValueManagement==2 && gref[j]==msng2) {
                    for (l=n;l<n+glen[j];l++) iresmiss[l]=2
                }
                else {
                    for (l=n;l<n+glen[j];l++) iresmiss[l]=0
                    for (l=non;l<non+glen[j];l++) ires[l]=gref[j]
                    non += glen[j]
                }
                n=n+glen[j]
            }
        }
    }

//
//  If using spatial differences, add overall min value, and
//  sum up recursively
//
    if (templateNumber == 3) {         // spatial differencing
        if (template[16] == 1) {      // first order
            ires[0]=ival1
            if ( template.missingValueManagement == 0 ) itemp=numberOfData        // no missing values
            else  itemp=non
            for (n=1;n<itemp;n++) {
                ires[n]=ires[n]+minsd
                ires[n]=ires[n]+ires[n-1]
            }
        }
        else if (template[16] == 2) {    // second order
            ires[0]=ival1
            ires[1]=ival2
            if ( template.missingValueManagement == 0 ) itemp=numberOfData        // no missing values
            else  itemp=non
            for (n=2;n<itemp;n++) {
                ires[n]=ires[n]+minsd
                ires[n]=ires[n]+(2*ires[n-1])-ires[n-2]
            }
        }
    }
//
//  Scale data back to original form
//
    //printf("SAGT: %f %f %f\n",ref,bscale,dscale);
    if ( template.missingValueManagement == 0 ) {        // no missing values
        for (n=0;n<numberOfData;n++) {
            res[n]=((ires[n]*bscale)+ref)*dscale
        }
    }
    else if ( template.missingValueManagement==1 || template.missingValueManagement==2 ) {
        // missing values included
        non=0
        for (n=0;n<numberOfData;n++) {
            if ( iresmiss[n] == 0 ) {
                res[n]=((ires[non++]*bscale)+ref)*dscale
            }
            else if ( iresmiss[n] == 1 )
                res[n]=rmiss1
            else if ( iresmiss[n] == 2 )
                res[n]=rmiss2
        }
    }

    return res

}

function gbit(data, offset, length) {
    var res = gbits(data, offset, length, 0, 1)
    return res[0]
}

function gbits(data, offset, length, iterOffset, nIter) {
    var res = []
    console.log("length = "+length)
    for(var i=0;i<nIter;i++) {
        res[i] = data.readUInt8(offset+i*(8+iterOffset))
        console.log(res[i])
    }
    /*
    var i,tbit,bitcnt,ibit,itmp
    var nbit,index;
    var ones = [1,3,7,15,31,63,127,255]

//     nbit is the start position of the field in bits
    nbit = offset;
    for (i=0;i<nIter;i++) {
        bitcnt = length;
        index=nbit/8;
        ibit=nbit%8;
        nbit = nbit + length + iterOffset;

//        first byte
        tbit= ( bitcnt < (8-ibit) ) ? bitcnt : 8-ibit;  // find min
        itmp = data[index] & ones[7-ibit]
        if (tbit != 8-ibit) itmp >>= (8-ibit-tbit)
        index++
        bitcnt = bitcnt - tbit;

//        now transfer whole bytes
        while (bitcnt >= 8) {
            itmp = itmp<<8 | data[index]
            bitcnt = bitcnt - 8;
            index++
        }

//        get data from last byte
        if (bitcnt > 0) {
            itmp = ( itmp << bitcnt ) | ( (data[index] >> (8-bitcnt)) & ones[bitcnt-1] )
        }

        res[i] = itmp
    }
    */
    return res
}

