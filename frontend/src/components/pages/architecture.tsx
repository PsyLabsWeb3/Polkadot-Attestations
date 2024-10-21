import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

function Box({ text, position, color = 'orange', width = 2, height = 0.5 }) {
  const mesh = useRef()
  const [hovered, setHover] = React.useState(false)

  useFrame(() => {
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, hovered ? 0.2 : 0, 0.1)
    mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, hovered ? 1.1 : 1, 0.1)
    mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, hovered ? 1.1 : 1, 0.1)
  })

  return (
    <mesh
      position={position}
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[width, height, 0.1]} />
      <meshStandardMaterial color={color} />
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </mesh>
  )
}

function BackgroundBox({ position, width, height, depth, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

function Arrow({ start, end, color }) {
  const direction = new THREE.Vector3().subVectors(end, start)
  const length = direction.length()
  const arrowHelper = new THREE.ArrowHelper(direction.normalize(), start, length, color, 0.2, 0.1)

  return (
    <primitive object={arrowHelper} />
  )
}

export default function ArquitecturaInteractiva() {
  const topComponents = [
    { text: 'Create Schemas', color: '#333333', width: 2 },
    { text: 'Attestations', color: '#333333', width: 2 },
    { text: 'Attached Contracts', color: '#333333', width: 2 },
    { text: 'Scan', color: '#333333', width: 2 },
  ]

  const pallets = [
    { text: 'Attestation Pallet', color: '#8a2be2', width: 2.5 },
    { text: 'Smart Contracts Pallet', color: '#333333', width: 2.5 },
    { text: 'Balance Pallet', color: '#333333', width: 2 },
    { text: 'Treasury Pallet', color: '#333333', width: 2 },
  ]

  // Calcular la posición de los componentes superiores
  const topTotalWidth = topComponents.reduce((sum, comp) => sum + comp.width, 0)
  let topCurrentX = -topTotalWidth / 2

  const topComponentsPositioned = topComponents.map((comp, index) => {
    const position = [topCurrentX + comp.width / 2, 1.7, 0]
    topCurrentX += comp.width
    return { ...comp, position }
  })

  // Calcular la posición de los pallets
  const palletTotalWidth = pallets.reduce((sum, pallet) => sum + pallet.width, 0)
  let palletCurrentX = -palletTotalWidth / 2

  const palletComponents = pallets.map((pallet, index) => {
    const position = [palletCurrentX + pallet.width / 2, -1.3, 0]
    palletCurrentX += pallet.width
    return { ...pallet, position }
  })

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem', fontSize: '3rem', background: 'linear-gradient(90deg, #FF2670, #7204FF)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Architecture</h2> {/* Título actualizado */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <BackgroundBox
          position={[0, 2, -0.1]}
          width={topTotalWidth + 0.5}
          height={1.5}
          depth={0.1}
          color="#E1E3F1"
        />
        
        <Text position={[0, 2.5, 0]} fontSize={0.3} color="#22005C">
          React UI
        </Text>

        {topComponentsPositioned.map((comp, index) => (
          <Box
            key={`top-${index}`}
            text={comp.text}
            position={comp.position}
            color={comp.color}
            width={comp.width}
          />
        ))}

        <BackgroundBox
          position={[0, -1, -0.1]}
          width={palletTotalWidth + 0.5}
          height={1.5}
          depth={0.1}
          color="#E1E3F1"
        />

        <Text position={[0, -0.5, 0]} fontSize={0.3} color="#22005C">
          Polkattest (POP CLI Parachain)
        </Text>

        {palletComponents.map((comp, index) => (
          <Box
            key={`pallet-${index}`}
            text={comp.text}
            position={comp.position}
            color={comp.color}
            width={comp.width}
          />
        ))}


        <Arrow start={new THREE.Vector3(0, 0.8, 0)} end={new THREE.Vector3(0, 1.1, 0)} color="#000000" />
        <Arrow start={new THREE.Vector3(0, 0.2, 0)} end={new THREE.Vector3(0, -0.1, 0)} color="#000000" />
        <Text position={[0, 0.5, 0]} fontSize={0.3} color="#000000">
          Polkadot JS API
        </Text>
      </Canvas>
    </div>
  )
}

export { ArquitecturaInteractiva as architecture }
