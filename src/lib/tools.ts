// 工具数据、分类定义与全局常量（收藏上限等）。

/** 主题模式：浅色 / 深色 / 跟随系统。 */
export type Theme = "light" | "dark" | "system";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  subcategory: string;
  tags: string[];
  pinyin: string;
  scenario: string;
  guide: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
}

/** 收藏上限：达到上限后继续收藏会提示用户，而非静默忽略。 */
export const MAX_FAVORITES = 12;

export const categories: Category[] = [
  {
    id: 'ai',
    name: 'AI 助手',
    icon: '🤖',
    color: 'blue',
    subcategories: [
      { id: 'ai-chat', name: '通用对话' },
      { id: 'ai-reasoning', name: '深度推理' },
    ],
  },
  {
    id: 'document',
    name: '文档与文件',
    icon: '📄',
    color: 'green',
    subcategories: [
      { id: 'doc-pdf', name: 'PDF 工具' },
      { id: 'doc-convert', name: '格式转换' },
    ],
  },
  {
    id: 'design',
    name: '设计与媒体',
    icon: '🎨',
    color: 'pink',
    subcategories: [
      { id: 'design-image', name: '图片处理' },
      { id: 'design-online', name: '在线设计' },
    ],
  },
  {
    id: 'collaboration',
    name: '协作与通讯',
    icon: '💬',
    color: 'cyan',
    subcategories: [
      { id: 'collab-im', name: '即时通讯' },
    ],
  },
  {
    id: 'industry',
    name: '行业工具',
    icon: '🏗️',
    color: 'orange',
    subcategories: [
      { id: 'industry-urban', name: '城市更新' },
    ],
  },
  {
    id: 'developer',
    name: '开发工具',
    icon: '⚡',
    color: 'purple',
    subcategories: [
      { id: 'dev-api', name: 'AI 开发平台' },
      { id: 'dev-hosting', name: '代码托管' },
    ],
  },
];

export const tools: Tool[] = [
  // AI 助手 - 通用对话
  {
    id: 'kimi',
    name: 'Kimi',
    description: '月之暗面AI，擅长长文本处理与联网搜索',
    url: 'https://kimi.moonshot.cn',
    icon: '🌙',
    category: 'ai',
    subcategory: 'ai-chat',
    tags: ['长文本', '联网搜索', '文件阅读'],
    pinyin: 'kimi km',
    scenario: '长文档阅读、联网资料查找',
    guide: '支持上传文件进行长文本分析，可联网搜索获取最新信息',
  },
  {
    id: 'doubao',
    name: '豆包',
    description: '字节跳动AI助手，多模态对话',
    url: 'https://www.doubao.com',
    icon: '🔵',
    category: 'ai',
    subcategory: 'ai-chat',
    tags: ['多模态', '语音', '图像'],
    pinyin: 'doubao db',
    scenario: '日常对话、语音交互、图片理解',
    guide: '支持语音和图片输入，适合多模态交互场景',
  },
  {
    id: 'yuanbao',
    name: '元宝',
    description: '腾讯AI助手，接入微信生态',
    url: 'https://yuanbao.tencent.com',
    icon: '🟢',
    category: 'ai',
    subcategory: 'ai-chat',
    tags: ['微信', '搜索'],
    pinyin: 'yuanbao yb',
    scenario: '微信生态内AI辅助、信息搜索',
    guide: '深度集成腾讯生态，支持微信搜索增强',
  },
  {
    id: 'yiyan',
    name: '文心一言',
    description: '百度AI助手，知识增强大模型',
    url: 'https://yiyan.baidu.com',
    icon: '🔶',
    category: 'ai',
    subcategory: 'ai-chat',
    tags: ['知识图谱', '搜索'],
    pinyin: 'wenxinyiyan wxyy',
    scenario: '知识问答、百度搜索增强',
    guide: '基于百度知识图谱，擅长中文知识类问答',
  },
  {
    id: 'xinghuo',
    name: '讯飞星火',
    description: '科大讯飞AI，语音技术领先',
    url: 'https://xinghuo.xfyun.cn',
    icon: '🔷',
    category: 'ai',
    subcategory: 'ai-chat',
    tags: ['语音', '教育'],
    pinyin: 'xunfeixinghuo xfxh',
    scenario: '语音交互、教育辅导、会议转写',
    guide: '语音识别与合成能力突出，适合语音交互场景',
  },
  // AI 助手 - 深度推理
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: '深度求索AI，推理与代码能力突出',
    url: 'https://www.deepseek.com',
    icon: '🔴',
    category: 'ai',
    subcategory: 'ai-reasoning',
    tags: ['推理', '数学', '代码', '深度思考'],
    pinyin: 'deepseek ds',
    scenario: '复杂推理、数学证明、代码生成',
    guide: '推理能力突出，适合需要深度思考的任务',
  },
  {
    id: 'zhipu',
    name: '智谱GLM',
    description: '智谱AI大模型，学术背景深厚',
    url: 'https://www.bigmodel.cn',
    icon: '🟠',
    category: 'ai',
    subcategory: 'ai-reasoning',
    tags: ['学术', '多模态', '代码'],
    pinyin: 'zhipuglm zpglm',
    scenario: '学术研究辅助、多模态理解',
    guide: '源自清华技术，擅长学术和技术场景',
  },
  {
    id: 'qwen',
    name: '通义千问',
    description: '阿里AI助手，全模态能力',
    url: 'https://qwen.ai',
    icon: '🟡',
    category: 'ai',
    subcategory: 'ai-reasoning',
    tags: ['全模态', '数学', '代码'],
    pinyin: 'tongyiqianwen tyqw',
    scenario: '全模态理解、数学推理、代码开发',
    guide: '支持文本、图片、音频、视频多模态输入',
  },
  // 文档与文件 - PDF工具
  {
    id: 'ilovepdf',
    name: 'iLovePDF',
    description: 'PDF处理工具箱，合并/拆分/转换/压缩',
    url: 'https://www.ilovepdf.com',
    icon: '📄',
    category: 'document',
    subcategory: 'doc-pdf',
    tags: ['PDF', '合并', '拆分', '压缩'],
    pinyin: 'ilovepdf ilp',
    scenario: 'PDF合并、拆分、转Word/图片、压缩、加水印',
    guide: '提供20+种PDF操作，免费版有文件大小限制',
  },
  {
    id: 'pdf24',
    name: 'PDF24',
    description: '免费PDF在线工具，无文件大小限制',
    url: 'https://www.pdf24.org',
    icon: '📑',
    category: 'document',
    subcategory: 'doc-pdf',
    tags: ['PDF', '免费', '无限制'],
    pinyin: 'pdf24',
    scenario: 'PDF各种操作，特别是大文件处理',
    guide: '完全免费，无文件大小和次数限制',
  },
  // 文档与文件 - 格式转换
  {
    id: 'cloudconvert',
    name: 'CloudConvert',
    description: '全能格式转换器，支持200+格式',
    url: 'https://cloudconvert.com',
    icon: '🔄',
    category: 'document',
    subcategory: 'doc-convert',
    tags: ['格式转换', '视频', '音频', '文档'],
    pinyin: 'cloudconvert cc',
    scenario: '各种文件格式互转，如视频/音频/文档/图片',
    guide: 'API可用，支持批量转换，免费版有日限额',
  },
  // 设计与媒体 - 图片处理
  {
    id: 'tinypng',
    name: 'TinyPNG',
    description: '智能图片压缩，PNG/JPG/WebP',
    url: 'https://tinypng.com',
    icon: '🖼️',
    category: 'design',
    subcategory: 'design-image',
    tags: ['图片压缩', 'PNG', 'WebP'],
    pinyin: 'tinypng tp',
    scenario: '网页图片压缩、素材体积优化',
    guide: '智能有损压缩，压缩率高且视觉损失小，免费版限20张/次',
  },
  // 设计与媒体 - 在线设计
  {
    id: 'canva',
    name: 'Canva',
    description: '在线设计平台，海报/PPT/社交媒体图',
    url: 'https://www.canva.com',
    icon: '🎨',
    category: 'design',
    subcategory: 'design-online',
    tags: ['海报', 'PPT', '社交媒体', '模板'],
    pinyin: 'canva',
    scenario: '快速制作海报、演示文稿、社交媒体图片',
    guide: '海量模板，拖拽式操作，无需设计基础',
  },
  // 协作与通讯 - 即时通讯
  {
    id: 'feishu',
    name: '飞书',
    description: '字节跳动协作平台，文档/日历/IM一体化',
    url: 'https://www.feishu.cn',
    icon: '🐦',
    category: 'collaboration',
    subcategory: 'collab-im',
    tags: ['即时通讯', '文档', '日历', '视频会议'],
    pinyin: 'feishu fs',
    scenario: '团队日常沟通、文档协作、日程管理',
    guide: '集成IM/文档/日历/会议，一站式团队协作',
  },
  {
    id: 'dingtalk',
    name: '钉钉',
    description: '阿里协作平台，考勤/审批/IM',
    url: 'https://www.dingtalk.com',
    icon: '💜',
    category: 'collaboration',
    subcategory: 'collab-im',
    tags: ['考勤', '审批', '即时通讯'],
    pinyin: 'dingtalk dd',
    scenario: '企业考勤、审批流程、日常沟通',
    guide: '考勤和审批功能完善，适合规范管理型企业',
  },
  {
    id: 'wework',
    name: '企业微信',
    description: '腾讯企业通讯，对接微信生态',
    url: 'https://work.weixin.qq.com',
    icon: '💚',
    category: 'collaboration',
    subcategory: 'collab-im',
    tags: ['微信', '客户管理', '即时通讯'],
    pinyin: 'qiyyeweixin qywx',
    scenario: '对接微信客户、企业内部沟通',
    guide: '可直接对接微信个人号，适合有外部客户沟通需求',
  },
  // 行业工具 - 城市更新
  {
    id: 'amap',
    name: '高德地图',
    description: '在线地图与测距工具',
    url: 'https://www.amap.com',
    icon: '🗺️',
    category: 'industry',
    subcategory: 'industry-urban',
    tags: ['地图', '测距', '定位'],
    pinyin: 'gaodeditu gddt',
    scenario: '选址分析、距离测量、区域定位',
    guide: '支持测距、标点、区域绘制，适合规划分析',
  },
  {
    id: 'szrcc',
    name: '深圳自然资源局',
    description: '深圳市规划和自然资源局官网',
    url: 'https://pnr.sz.gov.cn/index.html',
    icon: '🏢',
    category: 'industry',
    subcategory: 'industry-urban',
    tags: ['规划', '自然资源', '深圳'],
    pinyin: 'shenzhen zrzyj szzrzyj',
    scenario: '查询深圳规划政策、用地信息、审批公示',
    guide: '获取官方规划文件和公示信息',
  },
  {
    id: 'szggzy',
    name: '深圳公共资源交易',
    description: '土地出让/工程招投标信息',
    url: 'https://www.szggzy.com',
    icon: '📦',
    category: 'industry',
    subcategory: 'industry-urban',
    tags: ['土地', '招投标', '深圳'],
    pinyin: 'shenzhen ggzyjy szggzyjy',
    scenario: '查询土地出让公告、工程招标信息',
    guide: '关注土地交易和工程建设招标信息',
  },
  // 开发工具 - AI开发平台
  {
    id: 'deepseek-api',
    name: 'DeepSeek API',
    description: 'DeepSeek模型API服务',
    url: 'https://platform.deepseek.com',
    icon: '⚡',
    category: 'developer',
    subcategory: 'dev-api',
    tags: ['API', '大模型', '推理'],
    pinyin: 'deepseekapi dsapi',
    scenario: '调用DeepSeek模型进行应用开发',
    guide: '兼容OpenAI API格式，性价比高',
  },
  {
    id: 'zhipu-api',
    name: '智谱API',
    description: '智谱GLM模型API服务',
    url: 'https://www.bigmodel.cn/dev',
    icon: '🔧',
    category: 'developer',
    subcategory: 'dev-api',
    tags: ['API', '大模型', '多模态'],
    pinyin: 'zhipuapi zpapi',
    scenario: '调用智谱GLM系列模型',
    guide: '提供GLM-4等多模型API，支持微调',
  },
  {
    id: 'minimax-api',
    name: 'MiniMax API',
    description: 'MiniMax多模态API服务',
    url: 'https://www.minimaxi.com',
    icon: '⚙️',
    category: 'developer',
    subcategory: 'dev-api',
    tags: ['API', '语音', '多模态'],
    pinyin: 'minimaxapi mmapi',
    scenario: '调用MiniMax语音和多模态模型',
    guide: '语音合成能力突出，适合语音类应用开发',
  },
  // 开发工具 - 代码托管
  {
    id: 'github',
    name: 'GitHub',
    description: '全球最大代码托管与协作平台',
    url: 'https://github.com',
    icon: '🐙',
    category: 'developer',
    subcategory: 'dev-hosting',
    tags: ['代码托管', '开源', 'CI/CD'],
    pinyin: 'github gh',
    scenario: '代码托管、开源协作、CI/CD流水线',
    guide: '全球最大开源社区，Actions支持自动化',
  },
  {
    id: 'gitee',
    name: 'Gitee',
    description: '国内代码托管平台，访问稳定',
    url: 'https://gitee.com',
    icon: '🦊',
    category: 'developer',
    subcategory: 'dev-hosting',
    tags: ['代码托管', '国内', '企业版'],
    pinyin: 'gitee gt',
    scenario: '国内代码托管、企业私有化部署',
    guide: '国内访问速度快，企业版支持私有化',
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.category === categoryId);
}

export function getToolsBySubcategory(subcategoryId: string): Tool[] {
  return tools.filter((t) => t.subcategory === subcategoryId);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getSubcategoryById(categoryId: string, subcategoryId: string) {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find((s) => s.id === subcategoryId);
}
