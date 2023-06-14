package shillelaghsRUs.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import shillelaghsRUs.dao.ShillelaghRepository;
import shillelaghsRUs.entities.Shillelagh;

public class ShillelaghServiceTest {

	@Mock
	private ShillelaghRepository shiRepo;
	private ShillelaghService shiServ;
	List<Shillelagh> shillelaghs;
	Shillelagh shillelagh;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		shiServ = new ShillelaghService(shiRepo);
		shillelaghs = new ArrayList<>();
		shillelagh = new Shillelagh();
	}

	@Test
	public void testFindAll() {
		// given
		when(shiRepo.findAll()).thenReturn(shillelaghs);

		// when
		List<Shillelagh> res = shiServ.findAll();

		// then
		assertThat(res).isEqualTo(shillelaghs);
	}

	@Test
	public void testFindById() {
		// given
		when(shiRepo.existsById(anyLong())).thenReturn(true);
		when(shiRepo.findById(anyLong())).thenReturn(Optional.of(shillelagh));

		// when
		Shillelagh newShillelagh = shiServ.findById(1);

		// then
		assertThat(newShillelagh).isEqualTo(shillelagh);
	}

	@Test
	public void testExists() {
		// given
		when(shiRepo.existsById(anyLong())).thenReturn(true);

		// when
		boolean res = shiServ.exists(1);

		// then
		assertThat(res).isTrue();
	}

	@Test
	public void testFindQuantityInStock() {
		// given
		when(shiRepo.count()).thenReturn(Long.valueOf(shillelaghs.size()));

		// then
		assertThat(shiServ.findQuantityInStock()).isEqualTo(Long.valueOf(shillelaghs.size()));
	}

	@Test
	public void testFindbyId() {
		// given
		List<Shillelagh> theShillelaghs = new ArrayList<>();
		when(shiRepo.findAllById(anyList())).thenReturn(theShillelaghs);

		// when
		Iterable<Shillelagh> res = shiServ.findbyId(new ArrayList<Long>());

		// then
		assertThat(res).isEqualTo(theShillelaghs);
	}

	@Test
	public void testDeleteById() {
		// given
		when(shiRepo.existsById(anyLong())).thenReturn(true);

		// when
		boolean res = shiServ.deleteById(1);

		// then
		assertThat(res).isTrue();
	}

	@Test
	public void testEditShillelagh() {
		// given
		when(shiRepo.existsById(anyLong())).thenReturn(true);
		when(shiRepo.findById(anyLong())).thenReturn(Optional.of(shillelagh));

		// when
		boolean res = shiServ.editShillelagh(shillelagh);

		// then
		assertThat(res).isTrue();
	}

	@Test
	public void testOrderShillelagh() {
		// given
		when(shiRepo.existsById(anyLong())).thenReturn(true);
		when(shiRepo.findById(anyLong())).thenReturn(Optional.of(shillelagh));

		// when
		boolean res = shiServ.orderShillelagh(1);

		// then
		assertThat(res).isTrue();
	}

}
