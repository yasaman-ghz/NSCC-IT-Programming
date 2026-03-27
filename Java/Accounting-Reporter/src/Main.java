import javax.swing.*;
import java.util.ArrayList;
import static javax.swing.JOptionPane.showInputDialog;

public class Main {
    public static void main(String args[]) {
        ArrayList<Student> students = new ArrayList<>();
        ArrayList<Staff> staffMembers = new ArrayList<>();


        // the app will ask for the user to add a student/staff until they choose 'Finish'.
        boolean ch = true;
        do {
            String[] options = {"Student", "Staff", "Finish"};
            int choice = JOptionPane.showOptionDialog(null,
                    "Select one to add:", "Accounting App",
                    JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE,
                    null, options, options[0]);

            if (choice == 0) {
                String name = getValidInputString("Enter student's name:");
                String address = getValidInputString("Enter student's address: ");
                int year = getValidInputInteger("Enter student's year (1-4): ");
                while (year < 1 || year > 4) {
                    JOptionPane.showMessageDialog(null, "should be from 1 to 4!");
                    year = getValidInputInteger("Enter student's year (1-4): "); // reassigning a new input to year.
                }
                students.add(new Student(name, address, year));

            } else if (choice == 1) {
                String name = getValidInputString("Enter staff's name: ");
                String address = getValidInputString("Enter staff's address: ");
                int yearsOfService = getValidInputInteger("Enter staff's years of service: ");
                while (yearsOfService <= 0 || yearsOfService >= 25) {
                    JOptionPane.showMessageDialog(null, "should be form 1 to 24!");
                    yearsOfService = getValidInputInteger("Enter staff's years of service: ");
                }
                staffMembers.add(new Staff(name, address, yearsOfService));
            } else {
                ch = false;
            }
        } while (ch); // if the user selects 'Finish' the loop will stop and the final invoice will be shown.

        // getting a list of students with details.
        String report1 = "Total Students (" + students.size() + ")" + "\n";
        for (int i = 0; i < students.size(); i++) {
            report1 += (i + 1) + " - " + students.get(i).toString() + "\n";
        }

        // getting a list of staff members with details.
        String report2 = "Total Staff Members (" + staffMembers.size() + ")" + "\n";
        for (int i = 0; i < staffMembers.size(); i++) {
            report2 += (i + 1) + " - " + staffMembers.get(i).toString() + "\n";
        }

        double income = 0;
        for (int i = 0; i < students.size(); i++) {
            income += students.get(i).getInvoice();
        }
        String in = String.format("%.2f", income);

        double outgo = 0;
        for (int i = 0; i < staffMembers.size(); i++) {
            outgo += staffMembers.get(i).getBiweeklyPay();
        }
        String out = String.format("%.2f", outgo);

        String total = String.format("%.2f", (income - outgo));
        String invoice = report1 + "\n" + report2 + "\n" + "Result:\nOutgoing: " + out + "\nIncoming: "
                + in + "\nTotal: " + total;
        JOptionPane.showMessageDialog(null, invoice);
    }

    private static String getValidInputString(String message) {
        do {
            String input = showInputDialog(message);
            if (input == null || input.trim().isEmpty()) {  // checks if user hit cancel, entered just spaces, or only hit enter.
                JOptionPane.showMessageDialog(null, "Please enter valid information.");
            } else {
                return input;
            }
        } while (true);
    }

    private static int getValidInputInteger(String message) {
        do {
            String input = JOptionPane.showInputDialog(message);
            try {
                int number = Integer.parseInt(input);
                return number;   // return only works if parsing succeeds.
            } catch (NumberFormatException e) {
                JOptionPane.showMessageDialog(null, "Please enter a valid whole number.");
            }
        } while (true);
    }
}

