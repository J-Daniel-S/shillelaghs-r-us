package shillelaghsRUs.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import shillelaghsRUs.entities.Method;

@Repository
public interface MethodRepository extends CrudRepository<Method, Long> {

	public List<Method> findAll();

	@Query(nativeQuery = true, value = "SELECT * FROM methods WHERE customer_id = ?1")
	public List<Method> findByCustomerId(long id);

}
