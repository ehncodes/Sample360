var camera, scene, renderer;

			var isUserInteracting = false,
			onMouseDownMouseX = 0, onMouseDownMouseY = 0,
			lon = 0, onMouseDownLon = 0,
			lat = 0, onMouseDownLat = 0,
			phi = 0, theta = 0;

			init();
			animate();

			function init() {

				var container, mesh;

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
				camera.target = new THREE.Vector3( 0, 0, 0 );

				scene = new THREE.Scene();

				var geometry = new THREE.SphereGeometry( 500, 60, 40 );
				geometry.scale( - 1, 1, 1 );

				var material = new THREE.MeshBasicMaterial( {
					map: new THREE.TextureLoader().load( 'https://learn-eu-central-1-prod-fleet01-xythos.content.blackboardcdn.com/6100e9398f586/148635356?X-Blackboard-S3-Bucket=learn-eu-central-1-prod-fleet01-xythos&X-Blackboard-Expiration=1682607600000&X-Blackboard-Signature=%2F7%2BePnfhsZmVVTJHEWyQ%2FK1aU3hkKbDxk8pc20CiJwk%3D&X-Blackboard-Client-Id=301760&X-Blackboard-S3-Region=eu-central-1&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27GS__0090.JPG&response-content-type=image%2Fjpeg&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaDGV1LWNlbnRyYWwtMSJGMEQCIG%2BZ%2BYisM4gyo8F0T9zOeb%2BguIRIqvezVjJRPYLpVMBrAiAkF2cPCrlt37e1faCA9Byxccb6LQ0V7aYR%2FbSdnQnVZSq9BQhCEAMaDDYzNTU2NzkyNDE4MyIMwsPB85vqn58LtgmjKpoFoKzIX2j6jwdQ6qfQ1knaTlZezOOkyXh4v5dPUx0kGXmCVwa3dOSofoWnmVQRwmgtgbaMGSj7TiJQuCTfxCatpu1g8eozvJfHLbmD%2BAPBQoifbBMIMBcp37lFTDyZPtrEqt%2FTmJ0DJi8Fl7q6Di7Xy83lcERWciJ3rEvIPN75FalF4kKXJSD%2Bat%2BgRs%2FHl%2F9pdRm2gIuwY1769dWHkpT482TSh06QndBEkxiordMSQHe92xbYQ%2FG%2Bio8maaYO5JsqMADmkaMl6fz5VqqOf8uicHL62KqfqPpXnvaNqrO8eH99%2F7HAoDFv9FDFsE1ndp2%2FlfCKtUdnTpDN%2FL4A09PjiSuhfQ3izdoxg8RW1%2B826qaNI%2Fcrl1gedDIqSHQ3CFclhiRPdhtNcSQTDs82Bzy0gqkgHQQnil5j51XlcYbh5WZFbYxxzF7u6%2Fr%2Ffs6xQqlvNFhwzLOKeWgMrkfZIstaKyA%2ByAbqMHfkY3CNvIS54wqVC38AEr0v3OaZSIRlfYJ%2BaeK4ORfX462u0dPjQ95oQrBYg7oMMNYGArwri0HF8L5ArbjEiLwccFm%2Fx5kiR8iHWZz72dnGyaKxJZdSljOat3CtTZ53mfV%2FmupGV9xtVSLct58Ngj9ze5Zy5T2Pxbgtc5Nf5S3NdMSjE3dciOOU3QRsHwqpDdF0%2FI%2FZa7yhKbo%2FvUqBoXnHe%2BzU9yyVqlc5xzUOLmZSLNVQjxDIvRfhF2Z9psSN8WesJSOomvqPS4%2FLSSwsm%2BU37gisdVQqwr93nTOyUfrlVeyKn1H7jWFCPpujnGnK1hOYcfbVlEvFYlCZIVZpKJgGhh7q8sMLZ46gOKVgXnC4S7iNXR8CXD0HpOAES7HNLJr1YwH8o0HNoxgbAjo1F%2Fta%2FfGQMJzpqKIGOrIBRHj892L%2Bw2GXKUW7zUayB0uAtJ8hLx%2B7hcEz2wsgHlkxBtkD%2Fi7dmzZl2oNtg7YBq7Mh9%2FD5qqEumrnj%2FXQq90vDvYg%2BjkQxSk6%2Bu4SMHgZlYQ%2B8R3WKmFs26jbw1WRh44PriACRE1jSkXxgyFDQaytmaKJvBqowh4am5iX%2FeO1TFSGNsufVezxEiO2ypMyZCWenYBo%2BJi7Ej7zr7Ytxha0iPmnjNmysu1K7X7TGgP7ztg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230427T090000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=ASIAZH6WM4PL23UCDEW4%2F20230427%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=55a5bf3fa42b2e2b0ea94e61f4bf07c07d93f790fd28ca5f8e4b1ed0469bce42' )
				} );

				mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'wheel', onDocumentMouseWheel, false );

				//

				document.addEventListener( 'dragover', function ( event ) {

					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				}, false );

				document.addEventListener( 'dragenter', function ( event ) {

					document.body.style.opacity = 0.5;

				}, false );

				document.addEventListener( 'dragleave', function ( event ) {

					document.body.style.opacity = 1;

				}, false );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					var reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {

						material.map.image.src = event.target.result;
						material.map.needsUpdate = true;

					}, false );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

					document.body.style.opacity = 1;

				}, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

			function onDocumentMouseMove( event ) {

				if ( isUserInteracting === true ) {

					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

				}

			}

			function onDocumentMouseUp( event ) {

				isUserInteracting = false;

			}

			function onDocumentMouseWheel( event ) {

				camera.fov += event.deltaY * 0.05;
				camera.updateProjectionMatrix();

			}

			function animate() {

				requestAnimationFrame( animate );
				update();

			}

			function update() {

				if ( isUserInteracting === false ) {

					lon += 0.1;

				}

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
				camera.target.y = 500 * Math.cos( phi );
				camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( camera.target );

				/*
				// distortion
				camera.position.copy( camera.target ).negate();
				*/

				renderer.render( scene, camera );

			}