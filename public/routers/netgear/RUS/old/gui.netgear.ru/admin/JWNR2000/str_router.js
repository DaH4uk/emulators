function countmask(num)
{
 var i = 0;
 var count=0;
 var numArr = [128, 64, 32, 16, 8, 4, 2, 1];
for ( i = 0; i < numArr.length; i++ )
if ( (num & numArr[i]) != 0 )
count++;
return count;
}
