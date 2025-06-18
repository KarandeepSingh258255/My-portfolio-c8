import java.util.Scanner;

public class BasicCalculator {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Welcome to the Basic Calculator!");

        boolean continueCalc = true;

        while (continueCalc) {
            System.out.println("Enter your numbers:");
            double num1 = input.nextDouble();
            double num2 = input.nextDouble();

            System.out.println("Choose an operator: +, -, *, /");
            char op = input.next().charAt(0);

            double result = 0;

            switch (op) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 == 0) {
                        System.out.println("Error: Cannot divide by zero.");
                        continue;
                    }
                    result = num1 / num2;
                    break;
                default:
                    System.out.println("Invalid operator! Please use +, -, *, or /");
                    continue;
            }

            System.out.println("Result: " + result);
            System.out.println(num1 + " " + op + " " + num2 + " = " + result);

            System.out.println("Would you like to perform another calculation? (yes/no)");
            String answer = input.next();
            if (answer.equalsIgnoreCase("no")) {
                continueCalc = false;
                System.out.println("Thank you for using the Basic Calculator!");
            } else if (!answer.equalsIgnoreCase("yes")) {
                System.out.println("Invalid input! Please enter 'yes' or 'no'.");
            }
        }

        input.close(); 
    }
}
