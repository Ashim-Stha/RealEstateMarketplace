// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Another{
    struct Property{
        uint256 id;
        string location;
        uint256 price;
        address payable owner;
        bool isSold;
    }

    uint256 public propertyCounter;
    mapping(uint256 => Property) public properties;

    event PropertyListed(uint256 id,string location,uint256 price,address owner);
    event PropertySold(uint256 id,address buyer,uint256 price);

    //List a property
    function listProperty(string memory _location,uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");

        propertyCounter++;
        properties[propertyCounter]=Property({
            id:propertyCounter,
            location:_location,
            price:_price,
            owner:payable(msg.sender),
            isSold:false
        });

        emit PropertyListed(propertyCounter,_location,_price,msg.sender);
    }

    function buyProperty(uint256 _id) public payable{
        Property storage property=properties[_id];
        require(_id > 0 && _id <= propertyCounter, "Invalid property ID");
        require(!property.isSold, "Property sold");
        require(msg.value == property.price, "Incorrect amount");

        property.owner.transfer(msg.value);
        property.isSold=true;

        emit PropertySold(_id, msg.sender, msg.value); 

    }

    //Retrieve property 
    function getProperty(uint256 _id) public view returns(Property memory){
        require(_id > 0 && _id <= propertyCounter, "Invalid property ID");
        return properties[_id];
    }


}