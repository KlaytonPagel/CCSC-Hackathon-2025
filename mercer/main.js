import * as THREE from 'three';
import { Mercer } from './mercer.js';

var lineData = { 
	data: [{ 
		title: "2013", 
		values: [{ 
			x: 100, 
			y: 200 
		}, { 
			x: 200, 
			y: 400 
		}, { 
			x: 300, 
			y: 200 
		}, { 
			x: 400, 
			y: 400 
		}]
	}, {
		title: "2014", 
		values: [{ 
			x: 300, 
			y: 200 
		}, { 
			x: 200, 
			y: 800 
		}, { 
			x: 100, 
			y: 300 
		}] 
	}]
};

var lineMercer = new Mercer();
lineMercer.LineGraph("line-graph-container", lineData);
