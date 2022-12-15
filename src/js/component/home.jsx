import React, { useEffect, useState } from "react";


const Home = () => {

	//creo mis variables
	const urlBase = 'http://assets.breatheco.de/apis/fake/todos/user'
	const name = 'maicol'
	const bValue= "Delete"

	//creo mis hooks
	const [task, setTask] = useState({
		label: "",
		done: false
	});

	const [listTask, setListTask] = useState([]);

	const handleChange = (e) => {
		setTask({
			[e.target.name]: e.target.value,
			done: false
		})

	}

	// creo mis funciones
	const saveTask = (e) => {
		if (e.key === "Enter") {
			if (task.label.trim() !== "") {
				setListTask([...listTask, task])
				setTask({
					label: "",
					done: false})
					
				} else {
					console.log("La tarea no puede estar vacia")
				}
			
		}
	}

	const deleteTask = (id)=>{
		let newArray = listTask.filter((task, index)=> id != index)
		setListTask(newArray);
	}

	//funciones para la API

	const getTodos = async ()=>{

		try {
			let response = await fetch(`${urlBase}/${name}`)
			console.log(response.status)
			if(response.status === 404){
				let responseTodos = await fetch(`${urlBase}/${name}`,{
					method: "POST",
					headers:{
						  "Content-Type": "application/json",  
						},
					body: JSON.stringify([])
				})

				if(responseTodos.ok){
					console.log(`Se ha creado el usuario ${name}`)
					getTodos();
				}

			}else{
				let data = await response.json();
				setListTask(data)
				console.log("Epa bro, todo bien se han traido las tareas")
			}
		} catch (error) {
			console.log(`Epa manin explote con el siguiente error: ${error}`)
		}
	}

	const saveTodos = async (e)=>{
		if(e.key === "Enter"){
			if(task.label.trim()!==""){
				try {
					let response = await fetch(`${urlBase}/${name}`,{
						method: "PUT",
						headers: {
							"Content-Type" : "application/json"
						},
						body : JSON.stringify([...listTask,task])
					})
					if(response.ok){
						let data = await response.json();
						setTask({
							label: "",
							done: false})
						getTodos();	
						console.log(data);
					}else{
						console.log(response.status);
					}
				} catch (error) {
					console.log(`Explote manin con el siguiente error: ${error}`)
				}

			}else{
				console.log("La tarea no puede estar vacia")	
			}
		}
	}

	const deleteTaskApi = async (id)=>{
		let newArray = listTask.filter((task, index)=> id != index)
		console.log(newArray)
		if(newArray.length >= 1){
			try {
				let response = await fetch(`${urlBase}/${name}`, {
					method : "PUT",
					headers : {
						"Content-Type" : "application/json",
					},
					body : JSON.stringify(newArray)
				})
	
				if(response.ok){
					console.log("se borro la tarea")
					getTodos();
				}
			} catch (error) {
				console.log(`Explote manin con el siguiente error: ${error}`)
			}
		}else{
			setListTask([])
			
		}
	}

	const deleteUserApi = async ()=>{
		try {
			let response = await fetch(`${urlBase}/${name}`,{
				method : "DELETE"
			})

			if(response.ok){
				let data = await response.json();
				console.log(data)
				console.log("se borro el usuario")
				getTodos();
			}else{
				console.log("No se borro el usuario")
			}

		} catch (error) {
			console.log(`Explote manin revisa el error: ${error}`)
		}
	}

	useEffect(()=>{
		getTodos();
	},[])


	return (
		<>
			<h1 className="text-center todo">todos</h1>

			<div className="container  ">
				<div className="row  justify-content-center ">
					<div className="col-12 col-sm-10 col-md-8 col-lg-6  border border-bottom-0 px-5 py-2 contenedor d-flex">
						<input
							onKeyDown={saveTodos}
							onChange={handleChange}
							className="w-100 shadow-none"
							type="text"
							placeholder="What needs to be done?"
							value={task.label} 
							name = "label"/>
						<button onClick={deleteUserApi} className="btn btn-danger ms-3 button">Delete</button>	
					</div>
				</div>
				<div className="row justify-content-center ">
					<div className="col-12 col-sm-10 col-md-8 col-lg-6 border p-0 contenedor">
						<ul className="ps-0">
							{listTask < 1
								? <div className="ps-5 border-bottom py-2">
									No tasks, add a task
								</div>
								
								: listTask.map((item, index) => {
									return (
										<div key={index} onClick={()=>deleteTaskApi(index)} className="container border-bottom padre">
											<div className="tarea">
												<li className="lista" >{item.label}</li>
											</div>
											<div className="icono" >
												<i className="fas fa-times"></i>
											</div>
										</div>
									);
								})}
						</ul>
						<div className="registro">

						{`${listTask.length} item left`}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
