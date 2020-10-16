package shillelaghsrus.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "customers")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@SequenceGenerator(name = "customer_id", allocationSize = 1)
	@Column(name = "customer_id")
	private long id;
	@Column(nullable = false, unique = true)
	private String username;
	@Column(name = "first_name", nullable = true)
	private String firstName;
	@Column(name = "last_name", nullable = true)
	private String lastName;
	@Column(nullable = true)
	private String address;
	@Column(nullable = false, unique = true)
	private String email;
	@OneToMany(targetEntity = Order.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "customer")
	@JsonIgnore
	private List<Order> orders;
	@OneToMany(targetEntity = Method.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "customer")
	private List<Method> methods;
	@Column(nullable = true)
	private boolean admin;
	@Column(nullable = true)
	private String password;

	public Customer(String firstName, String lastName, String address, boolean admin) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.orders = new ArrayList<Order>();
		this.methods = new ArrayList<Method>();
		this.admin = admin;
	}

	public Customer(String username, String firstName, String lastName, String address, String password, String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.username = username;
		this.password = password;
		this.email = email;
		this.orders = new ArrayList<Order>();
		this.methods = new ArrayList<Method>();
		this.admin = false;
	}

	public Customer() {
		super();
		this.orders = new ArrayList<Order>();
		this.methods = new ArrayList<Method>();
	}

	public List<Method> getMethods() {
		return methods;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public void setMethods(List<Method> methods) {
		this.methods = methods;
	}

	// for testing
	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", address=" + address + ", orders=" + orders + "]";
	}

}
