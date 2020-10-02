package shillelaghsrus.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shillelaghsrus.dao.MethodRepository;
import shillelaghsrus.entities.Method;
import shillelaghsrus.exceptions.NoSuchOrderException;

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
