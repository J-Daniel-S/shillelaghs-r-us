package shillelaghsRUs.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shillelaghsRUs.dao.MethodRepository;
import shillelaghsRUs.entities.Method;
import shillelaghsRUs.exceptions.NoSuchOrderException;

@Service
public class MethodService {

	@Autowired
	private MethodRepository methRepo;

	public List<Method> findAll() {
		return methRepo.findAll();
	}

	public Method findById(long id) {
		if (methRepo.existsById(id)) {
			return methRepo.findById(id).get();
		} else {
			throw new NoSuchOrderException("Order does not exist: id-" + id);
		}
	}

	public boolean exists(long id) {
		return methRepo.existsById(id);
	}

	public void deleteById(long id) {
		methRepo.deleteById(id);
	}

	public void save(Method method) {
		methRepo.save(method);
	}

	public void save(List<Method> method) {
		methRepo.saveAll(method);
	}

	public List<Method> findByCustomer(long customerId) {
		return methRepo.findByCustomerId(customerId);
	}

}
