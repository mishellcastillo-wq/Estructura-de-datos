package APE07;
public class Paquete {
    private int id;
    private int codigoPostal;

    public Paquete(int id, int codigoPostal) {
        this.id = id;
        this.codigoPostal = codigoPostal;
    }

    public int getId() { return id; }
    public int getCodigoPostal() { return codigoPostal; }

    @Override
    public String toString() {
        return "Paquete{id=" + id + ", CP=" + codigoPostal + "}";
    }
}
