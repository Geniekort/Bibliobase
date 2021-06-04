import { QueryFilterMatcher } from "@/interfaces/interfaces";
import { DataAttribute, DataAttributeType } from "@/store/interfaces";

export default class QueryFilter{
  attributeName: string;
  matcher: QueryFilterMatcher;
  testValue: string | number;

  static matchers: Array<{
    name: QueryFilterMatcher; 
    text: string; 
    inputType: "text" | "number";
    allowedDataAttributeTypes: Array<DataAttributeType>;
  }> = [
    {
      "text": "contains value",
      "name": QueryFilterMatcher.CONTAINS,
      "inputType": "text",
      "allowedDataAttributeTypes": ["Text"]
    },
    {
      "text": "is exactly",
      "name": QueryFilterMatcher.EXACTLY,
      "inputType": "text",
      "allowedDataAttributeTypes": ["Text", "Number", "Reference", "DateTime"]
    },
    {
      "text": "is at least",
      "name": QueryFilterMatcher.AT_LEAST,
      "inputType": "number",
      "allowedDataAttributeTypes": ["Number","DateTime"]
    },
    {
      "text": "is at most",
      "name": QueryFilterMatcher.AT_MOST,
      "inputType": "number",
      "allowedDataAttributeTypes": ["Number","DateTime"]
    }
  ]

  constructor(attributeName: string, matcher: QueryFilterMatcher, testValue: string | number){
    this.attributeName = attributeName
    this.matcher = matcher
    this.testValue = testValue
  }

  toQueryObject(){
    return {
      [this.matcher]: {
        [this.attributeName]: this.testValue
      }
    }
  }

  toString(){
    return this.attributeName + " " + this.matcher + " " + this.testValue
  }

  static matcherNameToInputType(name: QueryFilterMatcher){
    const matcher = QueryFilter.matchers.find(matcher => matcher.name == name)
    return matcher?.inputType || "text"
  }

  static attributeTypeToAllowedMatchers(attributeType: DataAttributeType){
    return QueryFilter.matchers.filter(matcher => matcher.allowedDataAttributeTypes.includes(attributeType))
  }
}
