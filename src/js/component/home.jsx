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

	return (
		<>
			<h1 className="text-center">todos</h1>

			<div className="container ">
				<div className="row justify-content-center ">
					<div className="col-6 col-md-4 border ">
						<input
							onKeyDown={saveTask}
							onChange={handleChange}
							className="w-100 shadow-none"
							type="text"
							placeholder="What needs to be done?"
							value={task} />
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row justify-content-center ">
					<div className="col-6 col-md-4 border p-0">
						<ul className="ps-0">
							{listTask < 1
								? <span className="ps-3"> Agrega una tarea </span> 
								: listTask.map((item, index) => {
									return (
										<div key={index} className="container-fluid d-flex justify-content-between border-bottom">
											<div>
												<li className="lista" >{item}</li>
											</div>
											<div>
												<i className="fas fa-times"></i>
											</div>

										</div>
									);
								})}
						</ul>
					</div>
				</div>
			</div>
			{/* <Form/> */}
		</>
	);
};

export default Home;
