import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ChannelPreviewContext,
  ChannelService,
  ChatClientService,
  CustomTemplatesService,
  MessageContext,
  StreamI18nService,
} from 'stream-chat-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('customMessageTemplate')
  messageTemplate!: TemplateRef<MessageContext>;
  @ViewChild('customChannelPreviewTemplate')
  channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;
  newChannelName: string = 'FYT Channel';

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService,
  ) {
    const apiKey = 'azgarer9kttf';
    const userId = 'rough-dream-6';
    const userToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm91Z2gtZHJlYW0tNiJ9.zjqhNtCDNqcfGnNTeh1aLQrnYnW2VweUrf4kCfU69Zk';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();
  }

  async createChannel() {
    const channel = this.chatService.chatClient.channel(
      'messaging',
      this.newChannelName.replace(/\s+/g, '-').toLowerCase(),
      {
        name: this.newChannelName,
      },
    );

    try {
      await channel.create();
      this.channelService.init({ type: 'messaging', id: channel.id });
      this.newChannelName = 'FYT Channel';
    } catch (error) {
      console.error('Erreur lors de la création du canal :', error);
    }
  }

  async ngOnInit() {
    this.createChannel();

    this.channelService.init({
      type: 'messaging',
      id: 'talking-about-angular',
    });
  }

  ngAfterViewInit(): void {
    this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
    this.customTemplatesService.channelPreviewTemplate$.next(
      this.channelPreviewTemplate,
    );
  }
}
