package shillelaghsrus.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

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

	public Shillelagh(String name) {
		this.name = name;
		this.ordered = false;
		this.shipped = false;
	}

	public Shillelagh() {
		this.ordered = false;
		this.shipped = false;
	}

	public void setShillelaghId(long id) {
		this.shillelaghId = id;
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
