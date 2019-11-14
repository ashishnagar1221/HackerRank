import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        
        int i,size;
        float noo=0,noe=0,noz=0;
        Scanner sc = new Scanner(System.in);
        size = sc.nextInt();
        int arr[]=new int[size];
        for(i=0;i<size;i++)
        {
            arr[i] = sc.nextInt();
        }
        
        for(i=0;i<size;i++)
        {
            if(arr[i]==0)
                noz++;
            else if (arr[i]<0)
                noo++;
            else
                noe++;
        }
        System.out.println(noe/size);
         System.out.println(noo/size);
         System.out.println(noz/size);
        
    }
}
