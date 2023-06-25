package shillelaghsRUs.entities;

import java.text.DecimalFormat;

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

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "shillelaghs")
public class Shillelagh {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@SequenceGenerator(name = "shillelagh_id", allocationSize = 1)
	private long shillelaghId;
	private boolean ordered;
	private boolean shipped;
	@Nullable
	@ManyToOne(optional = true, targetEntity = Order.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id")
	@JsonIgnore
	private Order order;
	@Column(nullable = false)
	private String name;
	@Column
	private String price;

	public Shillelagh(String name) {
		this.name = name;
		this.ordered = false;
		this.shipped = false;
		this.price = generatePrice();
	}

	public Shillelagh() {
		this.ordered = false;
		this.shipped = false;
		this.price = generatePrice();
	}

	public void setShillelaghId(long id) {
		this.shillelaghId = id;
		this.price = generatePrice();
	}

	public String generatePrice() {
		double thePrice = 21 + Math.random() * 40;
		DecimalFormat df = new DecimalFormat("##.00");
		String price = df.format(thePrice);
		return price;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public long getShillelaghId() {
		return shillelaghId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isOrdered() {
		return ordered;
	}

	public void setOrdered(boolean ordered) {
		this.ordered = ordered;
	}

	public boolean isShipped() {
		return shipped;
	}

	public void setShipped(boolean shipped) {
		this.shipped = shipped;
	}

	public @Nullable Order getOrder() {
		return order;
	}

	public void setOrder(@Nullable Order order) {
		this.order = order;
	}

}
