import React, { useState } from "react";

import Form from "./Form.jsx";

const Home = () => {

	const [task, setTask] = useState("");

	const [listTask, setListTask] = useState([]);

	const handleChange = (e) => {
		setTask(e.target.value)

	}

	const saveTask = (e) => {
		if (e.key === "Enter") {
			if (task.trim() !== "") {
				setListTask([...listTask, task])
				setTask("")

			} else {
				console.log("La tarea no puede estar vacia")
			}

		}
	}

	const deleteTask = (id)=>{
		let newArray = listTask.filter((task, index)=> id != index)
		setListTask(newArray);
	}


	return (
		<>
			<h1 className="text-center todo">todos</h1>

			<div className="container  ">
				<div className="row justify-content-center ">
					<div className="col-8 col-md-6 border border-bottom-0 px-5 py-2 contenedor">
						<input
							onKeyDown={saveTask}
							onChange={handleChange}
							className="w-100 shadow-none"
							type="text"
							placeholder="What needs to be done?"
							value={task} />
					</div>
				</div>
				<div className="row justify-content-center ">
					<div className="col-8 col-md-6 border p-0 contenedor">
						<ul className="ps-0">
							{listTask < 1
								? <div className="ps-5 border-bottom py-2">
									No tasks, add a task
								</div>
								
								: listTask.map((item, index) => {
									return (
										<div key={index} onClick={()=>deleteTask(index)} className="container border-bottom padre">
											<div className="tarea">
												<li className="lista" >{item}</li>
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
