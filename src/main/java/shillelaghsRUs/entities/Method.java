package shillelaghsRUs.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "methods")
public class Method {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@SequenceGenerator(name = "method_id", allocationSize = 1)
	@Column(name = "method_id")
	private long id;
	@Column(nullable = false, name = "payment_type")
	private Type type;
	@Column(nullable = false)
	private long number;
	@Column(nullable = true, name = "routing_number")
	private Long routingNumber;
	@Column(nullable = true, name = "confirmation_number")
	private Long confirmationNumber;
	@Column(nullable = true, name = "expiration_date")
	private LocalDate expirationDate;
	@Column(nullable = true, name = "card_type")
	private Card card;
	@ManyToOne(targetEntity = Customer.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", nullable = false)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@JsonIgnore
	private Customer customer;

	public Method(Type type, long number, Customer customer) {
		super();
		this.type = type;
		this.number = number;
		this.customer = customer;
	}

	public Method(Type type, long number, long confirmationNumber, LocalDate expirationDate, Card card,
			Customer customer) {
		super();
		this.type = type;
		this.number = number;
		this.confirmationNumber = confirmationNumber;
		this.expirationDate = expirationDate;
		this.card = card;
		this.customer = customer;
	}

	public Method() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setRoutingNumber(Long routingNumber) {
		this.routingNumber = routingNumber;
	}

	public void setConfirmationNumber(Long confirmationNumber) {
		this.confirmationNumber = confirmationNumber;
	}

	public Long getRoutingNumber() {
		return routingNumber;
	}

	public void setRoutingNumber(long routingNumber) {
		this.routingNumber = routingNumber;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public long getNumber() {
		return number;
	}

	public void setNumber(long number) {
		this.number = number;
	}

	public Long getConfirmationNumber() {
		return confirmationNumber;
	}

	public void setConfirmationNumber(long confirmationNumber) {
		this.confirmationNumber = confirmationNumber;
	}

	public LocalDate getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}

	public Card getCard() {
		return card;
	}

	public void setCard(Card card) {
		this.card = card;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}

enum Type {
	CREDIT, BANKACCOUNT
}

enum Card {
	AMERICANEXPRESS, VISA, MASTERCARD, DISCOVER
}