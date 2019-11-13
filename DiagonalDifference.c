#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
int main(){
    int n,d,sum1=0,sum2=0,a[100][100],a_i,a_j;
    scanf("%d",&n);
     for(a_i = 0; a_i < n; a_i++){
       for(a_j = 0; a_j < n; a_j++){

	  scanf("%d",&a[a_i][a_j]);
       }
    }

    for(a_i = 0; a_i < n; a_i++){
       for(a_j = 0; a_j < n; a_j++){
	   if(a_i==a_j)
	       sum1=sum1+a[a_i][a_j];
       }
    }

    for(a_i = 0; a_i < n; a_i++){
       for(a_j = 0; a_j < n; a_j++){
	   if(a_i+a_j==n-1)
	       sum2=sum2+a[a_i][a_j];
       }
    }
    
    d=sum1-sum2;
    if(d<0)
        d=0-d;
   printf("%d",d);
    return 0;
   
}
