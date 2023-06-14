package shillelaghsRUs.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shillelaghsRUs.dao.ShillelaghRepository;
import shillelaghsRUs.entities.Shillelagh;
import shillelaghsRUs.exceptions.NoSuchShillelaghException;

@Service
public class ShillelaghService {

	@Autowired
	private ShillelaghRepository shiRepo;

	public List<Shillelagh> findAll() {
		return shiRepo.findAll();
	}

	public Shillelagh findById(long id) {

		if (shiRepo.existsById(id)) {
			return shiRepo.findById(id).get();
		} else {
			throw new NoSuchShillelaghException("Shillelagh does not exist: " + id);
		}

	}

	public boolean exists(long id) {
		return shiRepo.existsById(id);
	}

	public long findQuantityInStock() {
		return shiRepo.count();
	}

	public Iterable<Shillelagh> findbyId(List<Long> ids) {
		return shiRepo.findAllById(ids);
	}

	public boolean deleteById(long id) {
		if (shiRepo.existsById(id)) {
			shiRepo.deleteById(id);
			return true;
		} else {
			throw new NoSuchShillelaghException("Shillelah does not exist: " + id);
		}
	}

	public void deleteAll(List<Shillelagh> shillelaghs) {
		shiRepo.deleteAll(shillelaghs);
	}

	public Shillelagh save(Shillelagh shillelagh) {
		return shiRepo.save(shillelagh);
	}

	public Iterable<Shillelagh> saveAll(List<Shillelagh> shillelaghs) {
		return shiRepo.saveAll(shillelaghs);
	}

	public boolean editShillelagh(Shillelagh shillelagh) {
		if (shiRepo.existsById(shillelagh.getShillelaghId())) {
			Shillelagh toEdit = shiRepo.findById(shillelagh.getShillelaghId()).get();
			toEdit.setName(shillelagh.getName());
			toEdit.setOrdered(shillelagh.isOrdered());
			toEdit.setShipped(shillelagh.isShipped());
			shiRepo.save(toEdit);
			return true;
		} else {
			throw new RuntimeException("Shillelagh edit failed: id-" + shillelagh.getShillelaghId());
		}
	}

	public boolean orderShillelagh(long id) {
		// ordered is check at the controller level
		Shillelagh ordered = shiRepo.findById(id).get();
		ordered.setOrdered(true);
		shiRepo.deleteById(ordered.getShillelaghId());
		shiRepo.save(ordered);
		if (shiRepo.existsById(ordered.getShillelaghId())) {
			return true;
		} else {
			throw new RuntimeException("Shillelagh order failed: id-" + id);
		}

	}

	public void orderShillelaghs(List<Long> ids) {
		List<Shillelagh> shillelaghs = new ArrayList<Shillelagh>();
		shiRepo.findAllById(ids).forEach(shillelaghs::add);
		shillelaghs.forEach(s -> s.setOrdered(true));
		shillelaghs.forEach(s -> editShillelagh(s));
	}

	// test
	public ShillelaghService(ShillelaghRepository shiRepo) {
		this.shiRepo = shiRepo;
	}

}
