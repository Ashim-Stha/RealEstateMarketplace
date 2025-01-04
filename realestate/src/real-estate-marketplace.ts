import {
  AssestBought as AssestBoughtEvent,
  AssestCanceled as AssestCanceledEvent,
  AssestListed as AssestListedEvent
} from "../generated/RealEstateMarketplace/RealEstateMarketplace"
import { AssestBought, AssestCanceled, AssestListed } from "../generated/schema"

export function handleAssestBought(event: AssestBoughtEvent): void {
  let entity = new AssestBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssestCanceled(event: AssestCanceledEvent): void {
  let entity = new AssestCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssestListed(event: AssestListedEvent): void {
  let entity = new AssestListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
