import React from 'react';
import rough from 'roughjs/bundled/rough.esm';

const generator = rough.generator();

function createElement(x1, y1, x2, y2, type) {
	let roughElement;

	switch (type) {
		case 'line':
			roughElement = generator.line(x1, y1, x2, y2);
			break;
		case 'rectangle':
			roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
		default:
			break;
	};

	return { x1, y1, x2, y2, roughElement };
}

function Paint() {

	const [elements, setElements] = React.useState([]);
	const [drawing, setDrawing] = React.useState(false);
	const [elementType, setElementType] = React.useState('line');

	React.useLayoutEffect(() => {
		const canvas = document.querySelector('#canvas');
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);

		elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
	}, [elements]);

	const handleMouseDown = (evt) => {
		setDrawing(true);

		const { clientX, clientY } = evt;

		const element = createElement(clientX, clientY, clientX, clientY, elementType);

		setElements((prevState) => [...prevState, element]);
	};

	const handleMouseMove = (evt) => {
		if(!drawing) {
			return;
		};
		console.log(evt)

		const { clientX, clientY } = evt;
		const index = elements.length - 1;
		const { x1, y1 } = elements[index];
		
		const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

		const elementsCopy = [...elements];
		elementsCopy[index] = updatedElement;
		setElements(elementsCopy);
	};

	const handleMouseUp = (evt) => {
		setDrawing(false);
	};


	const handleChangeElementType = (evt) => {
		const target = evt.target;
		const value = target.value;
		setElementType(value);
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
	];

	const typesElementsInputsMarkup = typesElementsInputsData.map((item) => (
		<label
			key={item.id}
			className={item.labelClassName}
		>
			{item.label}
			<input 
				type={item.type}
				checked={elementType === item.value}
				onChange={handleChangeElementType}
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