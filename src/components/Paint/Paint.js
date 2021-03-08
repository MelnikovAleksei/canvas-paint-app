import React from 'react';
import rough from 'roughjs/bundled/rough.esm';

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
	let roughElement;

	switch (type) {
		case 'line':
			roughElement = generator.line(x1, y1, x2, y2);
			break;
		case 'rectangle':
			roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
			break;
		default:
			break;
	};

	return { id, x1, y1, x2, y2, type, roughElement };
}

const isWithinElement = (x, y, element) => {
	const { type, x1, x2, y1, y2 } = element;

	switch (type) {
		case 'rectangle':
			const minX = Math.min(x1, x2);
			const maxX = Math.max(x1, x2);
			const minY = Math.min(y1, y2);
			const maxY = Math.max(y1, y2);
			return x >= minX && x <= maxX && y >= minY && y <= maxY;
		case 'line':
			const a = { x: x1, y: y1 };
			const b = { x: x2, y: y2 };
			const c = { x, y };
			const offset = distance(a, b) - (distance(a, c) + distance(b, c));
			return Math.abs(offset) < 1;
		default:
			break;
	}
}

const distance = (a, b) => {
	// Pythagoras Theorem a2 + b2 = c2
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

const getElementAtPosition = (x, y, elements) => {
	return elements.find(element => isWithinElement(x, y, element));
}

function Paint() {

	const [elements, setElements] = React.useState([]);
	const [action, setAction] = React.useState('none');
	const [tool, setTool] = React.useState('line');
	const [selectedElement, setSelectedElement] = React.useState(null);

	React.useLayoutEffect(() => {
		const canvas = document.querySelector('#canvas');
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);

		elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
	}, [elements]);

	const updateElement = (id, x1, y1, x2, y2, type) => {
		const updatedElement = createElement(id, x1, y1, x2, y2, type);
	
		const elementsCopy = [...elements];
		elementsCopy[id] = updatedElement;
		setElements(elementsCopy);
	};

	const handleMouseDown = (evt) => {
		const { clientX, clientY } = evt;

		if (tool === 'selection') {
			const element = getElementAtPosition(clientX, clientY, elements);
			if (element) {
				const offsetX = clientX - element.x1;
				const offsetY = clientY - element.y1;
				setSelectedElement({...element, offsetX, offsetY});
				setAction('moving');
			}
		} else {
			const id = elements.length;
			const element = createElement(id, clientX, clientY, clientX, clientY, tool);
	
			setElements((prevState) => [...prevState, element]);

			setAction('drawing');
		}
	};

	const handleMouseMove = (evt) => {
		const { clientX, clientY } = evt;

		if (tool === 'selection') {
			evt.target.style.cursor = getElementAtPosition(clientX, clientY, elements) ? "move" : "default";
		}

		if (action === 'drawing') {

			const index = elements.length - 1;
			const { x1, y1 } = elements[index];
			
			updateElement(index, x1, y1, clientX, clientY, tool);

		} else if (action === 'moving') {

			const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;

			const width = x2 -x1;
			const height = y2 -y1;

			const newX1 = clientX - offsetX;
			const newY1 = clientY - offsetY;
			
			updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type)
			
		}
	};

	const handleMouseUp = (evt) => {
		setAction('none');
		setSelectedElement(null);
	};


	const handleChangeTool = (evt) => {
		const target = evt.target;
		const value = target.value;
		setTool(value);
	}

	const typesElementsInputsData = [
		{
			id: 1,
			type: 'radio',
			value: 'line',
			label: 'Line',
			inputClassName: 'paint__input',
			labelClassName: 'paint__label',
		},
		{
			id: 2,
			type: 'radio',
			value: 'rectangle',
			label: 'Rectangle',
			inputClassName: 'paint__input',
			labelClassName: 'paint__label',
		},
		{
			id: 3,
			type: 'radio',
			value: 'selection',
			label: 'Selection',
			inputClassName: 'paint__input',
			labelClassName: 'paint__label',
		},
	];

	const typesElementsInputsMarkup = typesElementsInputsData.map((item) => (
		<label
			key={item.id}
			className={item.labelClassName}
		>
			{item.label}
			<input 
				type={item.type}
				checked={tool === item.value}
				onChange={handleChangeTool}
				value={item.value}
				className={item.inputClassName}
			/>
		</label>
	));

	return (
		<div
			className="paint"
		>
			<fieldset
				className="paint__inputs-fieldset"
			>
				<legend
					className="paint__inputs-legent"
				>
					Shapes:
				</legend>
				{typesElementsInputsMarkup}
			</fieldset>
			<canvas 
				id='canvas'
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			/>
		</div>
		
	)
}

export default Paint;