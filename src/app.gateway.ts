import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupService } from './group/group.service';
import { LessonService } from './lesson/lesson.service';
import { TutorService } from './tutor/tutor.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly groupService: GroupService,
    private readonly lessonService: LessonService,
    private readonly tutorService: TutorService,
  ) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  // WebSocket системные сообщения

  afterInit(server: Server) {
    this.logger.log('Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected`);
    // this.lessonService.findAll().then((v) => {
    //   this.logger.log(JSON.stringify(v));
    // });
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  // WebSocket Listeners

  @SubscribeMessage('reqGroups')
  async reqGroupsMessage(
    client: Socket,
    payload: string,
  ): Promise</* void |  */ WsResponse<string>> {
    const data = await this.groupService.findAll();
    return { event: 'resGroups', data: JSON.stringify(data) };
  }

  @SubscribeMessage('reqLessons')
  async reqLessonsMessage(
    client: Socket,
    payload: string,
  ): Promise<WsResponse<string>> {
    const data = await this.lessonService.findAll();
    return { event: 'resLessons', data: JSON.stringify(data) };
  }

  @SubscribeMessage('reqTutors')
  async reqTutorsMessage(
    client: Socket,
    payload: string,
  ): Promise<WsResponse<string>> {
    const data = await this.tutorService.findAll();
    return { event: 'resTutors', data: JSON.stringify(data) };
  }

  @SubscribeMessage('reqSaveLesson')
  async reqAddLessonMessage(
    client: Socket,
    payload: string,
  ): Promise<void | WsResponse<string>> {
    const data: any = payload;
    if (data.id) {
      await this.lessonService.editLesson(data.info, data.tutor, data.id);
    } else {
      await this.lessonService.addLesson(
        data.info,
        data.tutor,
        data.day,
        data.time,
        data.group,
      );
    }
    const response = await this.lessonService.findAll();
    this.wss.emit('resLessons', JSON.stringify(response));
    return { event: 'resLessonModified', data: '' };
  }

  @SubscribeMessage('reqDeleteLesson')
  async reqDeleteLesson(
    client: Socket,
    payload: string,
  ): Promise<WsResponse<string>> {
    await this.lessonService.deleteLesson(Number(payload))
    const response = await this.lessonService.findAll();
    this.wss.emit('resLessons', JSON.stringify(response));

    return { event: 'resLessonModified', data: '' };
  }

  @SubscribeMessage('reqAddGroup')
  async reqAddGroup(
    client: Socket,
    payload: string,
  ): Promise<void | WsResponse<string>> {
    const data: any = payload;
    await this.groupService.addGroup(data)

    const response1 = await this.lessonService.findAll();
    this.wss.emit('resLessons', JSON.stringify(response1));
    const response2 = await this.groupService.findAll();
    this.wss.emit('resGroups', JSON.stringify(response2));

    // return { event: 'resGroup', data: '' };
  }

  @SubscribeMessage('reqDeleteGroup')
  async reqDeleteGroup(
    client: Socket,
    payload: string,
  ): Promise<void | WsResponse<string>> {
    const data: any = payload;
    await this.groupService.deleteGroup(data)

    const response1 = await this.lessonService.findAll();
    this.wss.emit('resLessons', JSON.stringify(response1));
    const response2 = await this.groupService.findAll();
    this.wss.emit('resGroups', JSON.stringify(response2));

    // return { event: 'resGroup', data: '' };
  }
}
