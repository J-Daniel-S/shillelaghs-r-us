import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';

const adminStock = (props) => {
	const [name, setName] = useState();
	const [price, setPrice] = useState();
	const [shillelaghs, setShillelaghs] = useState([]);
	const [picture, setPicture] = useState(false);
	const [needUpdate, setNeedUpdate] = useState(false);

	useEffect(() => {
		fetch('http://localhost:8090/shillelaghs-r-us/shillelaghs')
			.then(res => {
				if (res.status === 200) {
					res.json().then(res => setShillelaghs(res));
				} else {
					alert('Cannot reach server');
				}
			});
		setNeedUpdate(false);
	}, [needUpdate]);

	const changed = input => event => {
		switch (input) {
			case 'name':
				setName(event.target.value);
				break;
			case 'price':
				setPrice(event.target.value);
				break;
			default:
				break;
		}
	}

	const addShillelagh = (event) => {
		const form = event.currentTarget;
		event.preventDefault();

		if (!picture) {
			alert("You didn't upload a picture");
		} else {
			const newShillelagh = {
				name: form.name.value.toLowerCase(),
				price: form.price.value,
				shipped: false,
				ordered: false
			}

			const headers = {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': 'localhost:3000/',
				'Access-Control-Allow-Methods': 'POST',
				'Accept': 'application/json, text/plain, */*',
			}

			fetch('http://localhost:8090/shillelaghs-r-us/shillelaghs', 
				{
					method: 'POST',
					headers: headers,
					body: JSON.stringify(newShillelagh)
				})
				.then(res => res.status === 201 ? res.json().then(res => addToStock(res)) : alert('Failed to add shillelagh'));

		}
	}

	const addToStock = data => {
		setShillelaghs(data);
		setNeedUpdate(true);
		setName('');
		setPrice('');
	}

	const deleteShillelagh = shillelagh => {

		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'DELETE',
			'Accept': 'application/json, text/plain, */*',
		}

		fetch('http://localhost:8090/shillelaghs-r-us/shillelaghs/' + shillelagh.shillelaghId, 
			{
				method: 'DELETE',
				headers: headers,
				body: {}
			}).then(res => res.status === 202 ? res.json().then(res => setShillelaghs(res)) : alert('Failed to delete shillelagh'));

	}

	return (
		<article>
			<MDBContainer>
				<h3>Add shillelagh to stock</h3>
				<Form onSubmit={addShillelagh}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control required type="text" value={name} onChange={() => changed("name")} />
					</Form.Group>
					<Form.Group controlId="price">
						<Form.Label>Price</Form.Label>
						<Form.Control required type="number" step="any" value={price} onChange={() => changed("price")} />
					</Form.Group>
					<Button variant="grey" onClick={() => {
						setPicture(true);
						alert('picture uploaded');
					}}>Upload picture</Button>
					{picture && <Button variant="brown" type="submit">Add</Button>}
				</Form>
			</MDBContainer>
			<MDBContainer fluid>
				<MDBRow>
					<h3>Shillelaghs:</h3>
				</MDBRow>
				<MDBListGroup>
					{shillelaghs && shillelaghs.map(s => (
						<MDBListGroupItem key={s.shillelaghId}>
							Shillelagh Id: {s.shillelaghId} | name: {s.name} | Price: {Number.parseFloat(s.price).toFixed(2)} | In stock: {s.shipped ? 'No' : 'Yes'} | Available: {s.ordered ? 'No' : 'Yes'}
							<Button className="float-right" onClick={() => deleteShillelagh(s)} variant="grey">Delete</Button>
						</MDBListGroupItem>
					))}
				</MDBListGroup>
			</MDBContainer>
		</article>
	);
}

export default adminStock;