import java.util.*;
public class Function
{
    
    public static void add()
    {
        Scanner s=new Scanner(System.in);
        System.out.println("Enter a value:");
        int a=s.nextInt();
        System.out.println("Enter b value:");
        int b=s.nextInt();
        int c=a+b;
        System.out.println("Sum is: "+c);
        s.close();
    }
    public static void main(String[] args) 
    {
        add();
    }
}
