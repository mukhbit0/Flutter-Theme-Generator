import FlutterWidgetsTemplate from './FlutterWidgetsTemplate'
import RealFlutterApp from './RealFlutterApp'

export {
  FlutterWidgetsTemplate,
  RealFlutterApp
}

export const APP_TEMPLATES = {
  realapp: {
    name: 'Real Flutter App',
    description: 'Interactive Flutter app with real functionality',
    component: RealFlutterApp,
    icon: '📱'
  },
  widgets: {
    name: 'Flutter Widgets',
    description: 'Comprehensive showcase of interactive Flutter widgets',
    component: FlutterWidgetsTemplate,
    icon: '🧩'
  }
} as const

export type AppTemplateType = keyof typeof APP_TEMPLATES
