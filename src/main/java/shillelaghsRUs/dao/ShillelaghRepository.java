package shillelaghsRUs.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import shillelaghsRUs.entities.Shillelagh;

public interface ShillelaghRepository extends CrudRepository<Shillelagh, Long> {

	@Override
	public List<Shillelagh> findAll();

}
