
// I made my Person class abstract because in this app we need to know person's type,
//  so that we know if the person is paying or is being paid (to calculate an accurate invoice).
public abstract class Person {
    private String name;
    private String address;


    public Person(String name, String address) {
        this.name = name;
        this.address = address;
    }

    // I create getter and setter methods just in case of future use.
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // by making the toString method abstract, I am trying to enforce that every
    // child class will define its own toString method differently and accurately.
    public abstract String toString();
}
