package shillelaghsRUs.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import shillelaghsRUs.entities.Shillelagh;
import shillelaghsRUs.services.ShillelaghService;

public class ShillelaghControllerTest {

	@Mock
	private ShillelaghService shiRepo;
	private ShillelaghController controller;
	private Shillelagh shillelagh;
	List<Shillelagh> shillelaghs;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		controller = new ShillelaghController(shiRepo);
		shillelagh = new Shillelagh("murton's old backscratcher");
		shillelagh.setShillelaghId(78);
		shillelaghs = new ArrayList<>();
		shillelaghs.add(shillelagh);
	}

	@SuppressWarnings("rawtypes")
	@Test
	public void testAddShillelagh() {
		// given
		when(shiRepo.exists(anyLong())).thenReturn(true);

		// when
		ResponseEntity response = controller.addShillelagh(shillelagh);

		// then
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
	}

	@Test
	public void testGetShillelaghs() {
		// given
		when(shiRepo.findAll()).thenReturn(shillelaghs);

		// when
		ResponseEntity<List<Shillelagh>> response = controller.getShillelaghs();

		// then
		assertThat(response.getBody()).contains(shillelagh);
	}

	@Test
	public void testGetShillelagh() {
		// given
		when(shiRepo.exists(78L)).thenReturn(true);
		when(shiRepo.findById(78L)).thenReturn(shillelagh);

		// when
		ResponseEntity<Shillelagh> response = controller.getShillelagh(78);

		// then
		assertThat(response.getBody()).isEqualTo(shillelagh);
	}

}
