public class Student extends Person{
    private int year;
    private double fee;

    public Student(String name, String address, int year) {
        super(name, address);
        this.year = year;
        this.fee = Double.parseDouble(String.format("%.2f", ((this.year - 1) * 100.00 + 3000.00)));
    }

    // I create getter and setter methods just in case of future use.
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public double getFee() { return fee; }

    public void setFee(double fee) { this.fee = fee; }

    public String toString() {
        return "name= " + this.getName() + ", address= " +
                this.getAddress() + ", year= " + this.year +
                ", fee= $" + String.format("%.2f", this.getFee());
    }

    public double getInvoice() {
        return this.getFee() / 2;
    }

}
