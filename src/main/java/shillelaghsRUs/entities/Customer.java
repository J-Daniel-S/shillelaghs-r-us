package shillelaghsRUs.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

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
	@Column(nullable = false)
	private boolean admin;

	public Customer(String firstName, String lastName, String address, boolean admin) {
		super();
		this.firstName = firstName.toLowerCase();
		this.lastName = lastName.toLowerCase();
		this.address = address.toLowerCase();
		this.orders = new ArrayList<>();
		this.methods = new ArrayList<>();
		this.admin = admin;
	}

	public Customer() {
		super();
		this.orders = new ArrayList<>();
		this.methods = new ArrayList<>();
	}

	public List<Method> getMethods() {
		return methods;
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