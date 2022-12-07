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
							className="w-100"
							type="text"
							placeholder="What needs to be done?"
							value={task} />
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row justify-content-center ">
					<div className="col-6 col-md-4 border">
						<ul className="p-0">
						{listTask < 1
						? "Agrega una tarea"
						:listTask.map((item, index) => {
								return (
									<li className="lista" key={index}>{item} <i class="fas fa-times"></i></li>
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
 