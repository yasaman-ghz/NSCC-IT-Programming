public class Staff extends Person{
    private int yearService;
    private double pay;

    public Staff(String name, String address, int yearService) {
        super(name, address);
        this.yearService = yearService;
        this.pay = Double.parseDouble(String.format("%.2f", (this.yearService * 500.00 + 50000.00)));
    }

    // I create getter and setter methods just in case of future use.
    public int getYearService() {
        return yearService;
    }

    public void setYearService(int yearService) {
        this.yearService = yearService;
    }

    public double getPay() { return pay; }

    public void setPay(double pay) { this.pay = pay; }

    public String toString() {
        return "name= " + this.getName() + ", address= " +
                this.getAddress() + ", years= " + this.yearService +
                ", pay= $" + String.format("%.2f", this.getPay());
    }

    public double getBiweeklyPay() {
        return this.getPay() / 26;
    }

}
