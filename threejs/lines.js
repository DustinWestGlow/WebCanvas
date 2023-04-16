import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineDashedMaterial( {
	color: 0xffffff,
	linewidth: 10,
	scale: 10,
	dashSize: 30,
	gapSize: 1000,
} );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );

scene.add( line );
renderer.render( scene, camera );

function animate() {
	requestAnimationFrame( animate );
	line.rotation.z += 0.01;
	// cameraControls.update(); 
	// teapot.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();