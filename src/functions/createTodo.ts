import { v4 as uuidv4 } from 'uuid'
import { APIGatewayProxyHandler } from 'aws-lambda'
import * as dayjs from 'dayjs'
import { document } from '../utils/dynamodbClient'

interface ICreateTodo {
  id?: string
  title: string
  deadline: string
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo

  await document.put({
    TableName: 'todosls',
    Item: {
      id: uuidv4(),
      userId,
      title,
      done: false,
      deadline: dayjs(deadline).format('DD/MM/YYYY')
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Todo created' }),
    headers: { "Content-Type": "application/json" }
  }
}