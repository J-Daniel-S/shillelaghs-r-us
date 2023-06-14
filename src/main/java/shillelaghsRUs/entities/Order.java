package shillelaghsRUs.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@SequenceGenerator(name = "order_id", allocationSize = 1)
	private long orderId;
	@Column(name = "time")
	private LocalDateTime orderDate;
	@Column(nullable = false)
	private String address;
	@Column(nullable = false)
	private String email;
	@Column
	private boolean shipped;
	@OneToMany(targetEntity = Shillelagh.class, fetch = FetchType.LAZY, mappedBy = "order")
	@Column(nullable = false)
	private List<Shillelagh> contents;
	@Column(nullable = false, name = "total_price")
	private double totalPrice;
	@ManyToOne(targetEntity = Customer.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", nullable = true)
	@JsonIgnore
	private Customer customer;

	public Order(LocalDateTime time, String address, Customer customer, List<Shillelagh> contents) {
		this.orderDate = time;
		this.address = address;
		this.customer = customer;
		this.contents = contents;
		this.shipped = false;
	}

	public Order(Customer customer) {
		super();
		this.customer = customer;
		this.contents = new ArrayList<Shillelagh>();
		this.shipped = false;
	}

	public Order() {
		super();
		this.contents = new ArrayList<Shillelagh>();
		this.shipped = false;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isShipped() {
		return shipped;
	}

	public void setShipped(boolean shipped) {
		this.shipped = shipped;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<Shillelagh> getContents() {
		return contents;
	}

	public void setContents(List<Shillelagh> contents) {
		this.contents = contents;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public long getOrderId() {
		return orderId;
	}

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", orderDate=" + orderDate + ", address=" + address + ", email=" + email
				+ ", shipped=" + shipped + ", contents=" + contents + ", totalPrice=" + totalPrice + ", customer="
				+ customer + "]";
	}

}
