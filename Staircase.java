import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
    
        Scanner sc = new Scanner(System.in);
        int num  = sc.nextInt();
        for(int j=0;j<num;j++){
            for(int i=1;i<=num;i++){
                System.out.print(i<num-j?" ":"#");
            }
            System.out.println("");
        }
        
    }
}
        
