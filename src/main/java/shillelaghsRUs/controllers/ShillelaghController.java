package shillelaghsRUs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import shillelaghsRUs.entities.Shillelagh;
import shillelaghsRUs.exceptions.NoSuchShillelaghException;
import shillelaghsRUs.services.ShillelaghService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
@RequestMapping("/shillelaghs")
public class ShillelaghController {

	@Autowired
	public ShillelaghService shiRepo;

	@SuppressWarnings("rawtypes")
	@PostMapping
	public ResponseEntity addShillelagh(@RequestBody Shillelagh shillelagh) {
		shiRepo.save(shillelagh);
		if (shiRepo.exists(shillelagh.getShillelaghId())) {
			return ResponseEntity.status(HttpStatus.CREATED).body(shiRepo.findAll());
		} else {
			throw new RuntimeException("Shillelagh not saved");
		}
	}

	@PostMapping("/list")
	public ResponseEntity<List<Shillelagh>> addShillelaghs(@RequestBody List<Shillelagh> shillelaghs) {
		shiRepo.saveAll(shillelaghs);
		return ResponseEntity.accepted().build();
	}

	@GetMapping
	public ResponseEntity<List<Shillelagh>> getShillelaghs() {
		return ResponseEntity.ok(shiRepo.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Shillelagh> getShillelagh(@PathVariable long id) {
		if (shiRepo.exists(id)) {
			return ResponseEntity.ok(shiRepo.findById(id));
		} else {
			throw new NoSuchShillelaghException("Shillelagh does not exist: " + id);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<List<Shillelagh>> deleteShillelagh(@PathVariable long id) {
		if (shiRepo.exists(id)) {
			shiRepo.deleteById(id);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(shiRepo.findAll());
		} else {
			throw new NoSuchShillelaghException("Shillelagh does not exist: id-" + id);
		}
	}

	// for testing
	public ShillelaghController(ShillelaghService shiRepo) {
		this.shiRepo = shiRepo;
	}

}
