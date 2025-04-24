import { vec3 } from '@react-three/rapier'
import { randInt } from 'three/src/math/MathUtils'

import Rocks from '../components/gameprops/Rocks'
import Pounds from '../components/gameprops/Pounds'
import Coins from '../components/gameprops/Coins'

import { v4 } from 'uuid'

export const RandomMinMax = (min, may) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const obstacle = [Coins, Rocks, Pounds]
const RandomObstacles = (obs,index) =>{
  
    let generatedObjs = {indexObs: obstacle[index], index}
    const found = obs.findIndex((value) => value.obstacleIndex == generatedObjs.index)

    if(found != -1){
      generatedObjs = RandomObstacles(obs, randInt(0, obstacle.length - 1))
    }

    return generatedObjs
}

export const ObstacleList = (start, end, name) => {
    const t = []
    
    for (let index = 0; index < obstacle.length ; index++) {
        const indOps = RandomObstacles(t,randInt(0, obstacle.length-1))
       
        const obs = {
          side: !!randInt(0, 1) ? -1 : 1,
          Obstacle: indOps.indexObs,
          obstacleIndex: indOps.index,
          posZ: randInt(end,start),
          uuid: v4()
        }

        t.push(obs)
    }

    return t
}

export const GetForwardTranslation = (ref, speed, rem) => {
    const refObject = ref.current
    const cT = refObject.translation()
    return vec3({ x: rem?.x || cT.x, y: rem?.y || cT.y, z: cT.z + speed })
}

export const GetDownwardTranslation = (ref, rem) => {
    const refObject = ref.current
    const cT = refObject.translation()
    return vec3({ x: cT.x, y: rem?.y || cT.y, z: cT.z })
}

export const ZeroPad = (num, places) => String(num).padStart(places, "0")

export const ObjectsPosition = {}