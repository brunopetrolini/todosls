import { APIGatewayProxyHandler } from 'aws-lambda'
import { document } from '../utils/dynamodbClient'

export const handle: APIGatewayProxyHandler = async (event) => {
 const { userId } = event.pathParameters
 
 const response = await document.query({
   TableName: 'todosls',
   KeyConditionExpression: 'userId = :userId',
   ExpressionAttributeValues: {
     ':userId': String(userId)
   }
 }).promise()

 const user = response.Items[0]

 return {
   statusCode: 200,
   body: JSON.stringify({ user }),
   headers: { "Content-Type": "application/json" }
 }
}