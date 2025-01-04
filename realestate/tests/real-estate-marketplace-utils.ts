import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AssestBought,
  AssestCanceled,
  AssestListed
} from "../generated/RealEstateMarketplace/RealEstateMarketplace"

export function createAssestBoughtEvent(
  buyer: Address,
  tokenId: BigInt,
  price: BigInt
): AssestBought {
  let assestBoughtEvent = changetype<AssestBought>(newMockEvent())

  assestBoughtEvent.parameters = new Array()

  assestBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  assestBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  assestBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return assestBoughtEvent
}

export function createAssestCanceledEvent(
  seller: Address,
  tokenId: BigInt
): AssestCanceled {
  let assestCanceledEvent = changetype<AssestCanceled>(newMockEvent())

  assestCanceledEvent.parameters = new Array()

  assestCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  assestCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return assestCanceledEvent
}

export function createAssestListedEvent(
  seller: Address,
  tokenId: BigInt,
  price: BigInt
): AssestListed {
  let assestListedEvent = changetype<AssestListed>(newMockEvent())

  assestListedEvent.parameters = new Array()

  assestListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  assestListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  assestListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return assestListedEvent
}
