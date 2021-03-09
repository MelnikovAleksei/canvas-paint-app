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

const nearPoint = (x, y, x1, y1, name) => {
	return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const positionWithinElement = (x, y, element) => {
	const { type, x1, x2, y1, y2 } = element;

	switch (type) {
		case 'rectangle':
			const topLeft = nearPoint(x, y, x1, y1, 'top-left');
			const topRight = nearPoint(x, y, x2, y1, 'top-right');
			const bottomLeft = nearPoint(x, y, x1, y2, 'bottom-left');
			const bottomRight = nearPoint(x, y, x2, y2, 'bottom-right');
			const insideRectangle = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;
			return topLeft || topRight || bottomLeft || bottomRight || insideRectangle;
		case 'line':
			const a = { x: x1, y: y1 };
			const b = { x: x2, y: y2 };
			const c = { x, y };
			const offset = distance(a, b) - (distance(a, c) + distance(b, c));
			const start = nearPoint(x, y, x1, y1, 'start');
			const end = nearPoint(x, y, x2, y2, 'end');
			const insideLine = Math.abs(offset) < 1 ? 'inside' : null;
			return start || end || insideLine;
		default:
			break;
	};
};

const distance = (a, b) => {
	// Pythagoras Theorem a2 + b2 = c2
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const getElementAtPosition = (x, y, elements) => {
	return elements
		.map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
		.find(element => element.position !== null);
};

const adjustElementCoordinates = (element) => {
	const { type, x1, y1, x2, y2 } = element;
	switch (type) {
		case 'rectangle':
			const minX = Math.min(x1, x2);
			const maxX = Math.max(x1, x2);
			const minY = Math.min(y1, y2);
			const maxY = Math.max(y1, y2);
			return { x1: minX, x2: maxX, y1: minY, y2: maxY };
		case 'line':
			if (x1 < x2 || (x1 === x2 && y1 < y2)) {
				return { x1, y1, x2, y2 };
			} else {
				return { x1: x2, y1: y2, x2: x1, y2: y1 };
			}
		default:
			break;
	};
};

const cursorForPosition = (position) => {
	switch (position) {
		case 'top-left':
		case 'bottom-right':
		case 'start':
		case 'end':
			return 'nwse-resize';
		case 'top-right':
		case 'bottom-left':
			return 'nesw-resize';
		default:
			return 'move';
	};
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
	const { x1, y1, x2, y2 } = coordinates;
	switch (position) {
		case 'top-left':
		case 'start':
			return { x1: clientX, y1: clientY, x2, y2 };
		case 'bottom-left':
			return { x1: clientX, x2, y1, y2: clientY };
		case 'top-right':
			return { x1, x2: clientX, y1: clientY, y2 };
		case 'bottom-right':
		case 'end':
			return { x1, x2: clientX, y1, y2: clientY };
		default:
			return null;
	}
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

	const handleDown = (evt) => {
		let clientX, clientY;
		if (evt.type === 'mousedown') {
			clientX = evt.clientX;
			clientY = evt.clientY;
		} else {
			clientX = evt.touches[0].clientX;
			clientY = evt.touches[0].clientY;
		};

		if (tool === 'selection') {
			const element = getElementAtPosition(clientX, clientY, elements);
			if (element) {
				const offsetX = clientX - element.x1;
				const offsetY = clientY - element.y1;
				setSelectedElement({...element, offsetX, offsetY});

				if (element.position === 'inside') {
					setAction('moving');
				} else {
					setAction('resizing');
				}
			}
		} else {
			const id = elements.length;
			const element = createElement(id, clientX, clientY, clientX, clientY, tool);
	
			setElements((prevState) => [...prevState, element]);

			setSelectedElement(element);

			setAction('drawing');
		}
	};

	const handleMove = (evt) => {
		let clientX, clientY;
		if (evt.type === 'mousemove') {
			clientX = evt.clientX;
			clientY = evt.clientY;
		} else {
			clientX = evt.touches[0].clientX;
			clientY = evt.touches[0].clientY;
		};
		if (tool === 'selection') {
			const element = getElementAtPosition(clientX, clientY, elements);
			evt.target.style.cursor = element ? cursorForPosition(element.position) : "default";
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
			
		} else if (action === 'resizing') {

			const { id, type, position, ...coordinates } = selectedElement;

			const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);

			updateElement(id, x1, y1, x2, y2, type);
		}
	};

	const handleUp = () => {
		if (action === 'drawing' || action === 'resizing') {
			const index = selectedElement.id;
			const { id, type } = elements[index];
			const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index])
			updateElement(index, x1, y1, x2, y2, type);
		}
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
			<form>
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
			</form>
			<canvas 
				id='canvas'
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={handleDown}
				onTouchStart={handleDown}
				onTouchMove={handleMove}
				onMouseMove={handleMove}
				onMouseUp={handleUp}
				onTouchEnd={handleUp}
			/>
		</div>
		
	)
}

export default Paint;