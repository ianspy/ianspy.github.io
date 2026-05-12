import { useState, useEffect } from 'react'
import './App.css'
import profilePicture from './assets/profile_picture.png'

interface Article {
  title: string
  url: string
}

interface Tab {
  id: string
  label: string
  shortLabel: string
  articles: Article[]
}

const tabs: Tab[] = [
    { id: 'ide', label: 'Python IDE 配置教程', shortLabel: 'IDE配置', articles: [
    {
      title: '零基础也能秒懂！傻瓜式配置Python开发环境!（Anaconda+PyCharm）',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247483978&idx=1&sn=d525924e6c03f81a6a6a9d1ce5d18a99&chksm=c26383e1f5140af752d55d41b7812f824770b9a5031f43289a7cef06c5b9aa5224180d87ad05&token=1954277734&lang=zh_CN#rd'
    },
    {
      title: '便捷轻量的新一代包管理工具，UV创建Python开发环境！（UV+PyCharm）',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484479&idx=1&sn=0645ef51404eab66f85cd7631d2103c6&chksm=c2638594f5140c82ceca94737d90cac28973c74f3f4a15355a211355feaa63627b55d139292c&token=1954277734&lang=zh_CN#rd'
    }
  ] },
  {
    id: 'pyside6',
    label: 'Python GUI设计【Pyside6】',
    shortLabel: 'PySide6',
    articles: [
      {
        title: 'Python跨平台图形用户界面(GUI)开发【PySide6】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484311&idx=1&sn=dfb921519f33b60dcca5fd09564d1bf9&chksm=c263823cf5140b2af11f7d492212186e9739d2b3dc53abeabf6e09fef02df2cc6636a231d877&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '用控件创建一个简单的Python GUI界面，你只需这样做...【PySide6】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484345&idx=1&sn=4271cf47000363206ea22127133a697c&chksm=c2638212f5140b040171c10100dfa95ea4087906f796dbfbf05c622ba6c0c92a869f5ebac4aa&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '不用写一行代码？！Qt Designer拖拽一键生成GUI界面~【PySide6】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484604&idx=1&sn=294837b00f7d849b3e52fb668140ec21&chksm=c2638517f5140c013d598d9457fee0befa04c7393152e535c127347be0376f9668eb211b934d&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '界面交互三大要素：显示、输入与触发，QLabel、QLineEdit/QTextEdit与QPushButton实现【PySide6】',
        url: 'https://mp.weixin.qq.com/s/knNh_v8PQWIi7NMbuN3r1w'
      },   
      {
        title: '动动滚轮就能输数！数字输入控件QSpinBox/QDoubleSpinBox超简单教程【PySide6】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484872&idx=1&sn=ba139930c4c5986641c08a659f7480a9&chksm=c2638463f5140d75935fad50a84ea8a94b2c56def8433a5ea3c34e2cc74153fd038bb49a8daa&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '滑着就能动！滑块控件QSlider、QScrollBar、QDial超简单实现【PySide6】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484944&idx=1&sn=67cdf916588f79878f8d35e3c5bbed6f&chksm=c26387bbf5140eadd6b46b2b99792000f782b536d7d7baa437494ad10730726fa66863c0cdcd&token=1954277734&lang=zh_CN#rd'
      }
    ]
  },
  { id: 'tips', label: '五分钟Python小知识', shortLabel: '小知识', articles: [
    {
        title: '这么久了，还没有对象？！那来Copy一个吧~【五分钟Python小知识】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484064&idx=1&sn=8722b71cb8bb9c3f045f08af65f8f7c2&chksm=c263830bf5140a1d8f738cd9200d9047702b2064b86383b4fed50f94c509f0505a84e2ffafa3&token=1954277734&lang=zh_CN#rd'
      },
    {
        title: '简洁的lambda函数，掌握了成为Python高手！！',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484216&idx=1&sn=bfe38ebf7083053ef1baf90611c04045&chksm=c2638293f5140b8516e79b1a737cb160bfcf38aaa4352d03865658439d6ad9680c138f062411&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '一行enumerate，优雅迭代~[五分钟Python小知识]',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484225&idx=1&sn=9e5b6f32d4d9bb7e6e0684ffa76649d5&chksm=c26382eaf5140bfcd918b72afd94ed5459e143c2fa6b81e4b5b11fe8d6072cd86d9e658a063f&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: 'f-string，Python字符串格式化神器：让代码优雅起飞！！【五分钟Python小知识】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484232&idx=1&sn=884ef46cc2b1240d5dc63e8783752a23&chksm=c26382e3f5140bf5d686e302a4f91cbe40729337167497418bdf8d946f208647d0166ad55c43&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '不再崩溃！Python异常处理一招搞定~',
        url: 'https://mp.weixin.qq.com/s/wxyfbWIyJ6LHRk1lO0EHVw?token=1954277734&lang=zh_CN'
      },
      {
        title: 'Python异常处理更简洁！contextlib.suppress来帮你忙！【五分钟Python小知识】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484244&idx=1&sn=81210a5c3c51ca72700ab2568f969988&chksm=c26382fff5140be9de6eab883b4ca4b836d7745978b3006fedf65fbe0a30cb0587b4405d3a05&token=1954277734&lang=zh_CN#rd'
      },
      {
        title: '什么都不做也行？三大用法帮助你调试Python代码！！【五分钟Python小知识】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484251&idx=1&sn=20a4720a8012f0e8c76e099b1e4a18db&chksm=c26382f0f5140be6851a3d5b989bfee63e0fe988e65c18421ad9c8dd1cd28203413bc28f41f1&token=1954277734&lang=zh_CN#rd'
      }
  ] },
  { id: 'visualization', label: 'Python数据可视化', shortLabel: '可视化', articles: [
    {
        title: '一张画板一张画纸，另一个角度入门数据可视化，神器matplotlib基础教程【数据可视化】',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484962&idx=1&sn=54608417122bab700c66b316f65a32b5&chksm=c2638789f5140e9fb917707c81f1930c6775e41ce5927cff1a749fb3c93012ac43e4d5a147b6&token=1954277734&lang=zh_CN#rd'
      },
    {
        title: 'Pairwise Data成对数据绘图，matplotlib全精通~【数据可视化】',
        url: 'https://mp.weixin.qq.com/s/01hoRztITv43QlllwW808g'
      }, 
  ] },

  { id: 'datastructure', label: 'Python数据结构', shortLabel: '数据结构', articles: [
    {
      title: 'Python[列表]的魔法，全部揭秘！！！',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484000&idx=1&sn=79ebfe1f605a920180167bdff02b0bb7&chksm=c26383cbf5140adda6b7052255621f5a80a70499e14d6027a2f077f77966b8f2ea86c1d107d4&token=1954277734&lang=zh_CN#rd'
    },
    {
      title: '不动如山！Python(元组)的稳定哲学！！！',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484031&idx=1&sn=2be29af6a1245c3073a7c1c086fbd258&chksm=c26383d4f5140ac215f8f2e8b63014655e6ae4124d46f9d669e836287b93738f64321d36ecb9&token=1954277734&lang=zh_CN#rd'
    },
    {
      title: 'Python集合、字典傻傻分不清？！一招教你轻松分辨~',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484045&idx=1&sn=05cc41293cc2551236eefeba214885ae&chksm=c2638326f5140a30560c67810645be21d63da6e1d7eafd5392ae660052e4aa7767ee76aab416&token=1954277734&lang=zh_CN#rd'
    }
  ] },
  { id: 'blacktech', label: 'Python黑科技【库应用】', shortLabel: '黑科技', articles: [
    {
      title: '造假！？我们Python界有自己的Faker！',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484011&idx=1&sn=56bfe1f328e4db0c1842c907fb8b354c&chksm=c26383c0f5140ad605255f311a0975cb916ea49b7803fcaf8bb944d649f623e5fa4e42845df1&token=1954277734&lang=zh_CN#rd'
    }
  ] },
  { id: 'software', label: 'Python黑科技【小软件】', shortLabel: '小软件', articles: [
    {
      title: '我做了一个育儿补贴计算器~',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484195&idx=1&sn=4afbb5b6c0f616467fe7927aeba4ab37&chksm=c2638288f5140b9e8503b7efcc259b2cefa09324d94320ae7bebd07aadf22ebd70f98b2b4393&token=1954277734&lang=zh_CN#rd'
    }
  ] },
  { id: 'ai', label: 'Python AI', shortLabel: '小软件', articles: [
    {
      title: 'AI大模型，我的身后，是千军万马！！',
      url: 'https://mp.weixin.qq.com/s/shq2QSUfiP64Tcynz81mpw?token=1954277734&lang=zh_CN'
    },
    {
      title: '超简单攻略，教你用Ollama轻松本地部署DeepSeek大模型~【Python AI】',
      url: 'https://mp.weixin.qq.com/s?__biz=MzkzMTk3NzQxMg==&mid=2247484754&idx=1&sn=af6af4a599183b119d79144f6066144f&chksm=c26384f9f5140def1fc28d7effa1930c345bc0b57fa94fe2fc582e2ed0f118986bad63705002&token=1954277734&lang=zh_CN#rd'
    }
  ] }
]

function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [visitorCount, setVisitorCount] = useState(0)

  const activeTabData = tabs.find(tab => tab.id === activeTab)
  const totalArticles = tabs.reduce((sum, tab) => sum + tab.articles.length, 0)

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/ianspy.github.io/visits')
        const data = await response.json()
        setVisitorCount(data.value)
      } catch (error) {
        setVisitorCount(Math.floor(Math.random() * 1000) + 500)
      }
    }
    fetchVisitors()
  }, [])

  return (
    <div className="github-layout">
      {/* 顶部导航栏 */}
      <header className="top-bar">
        <div className="header-content">
          {/* 左侧 Home 按钮 */}
          <nav className="left-nav">
            <button className="home-btn" onClick={() => window.location.reload()}>
              <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"></path>
              </svg>
              Home
            </button>
          </nav>
          {/* 中间占位 */}
          <nav className="center-nav"></nav>
          {/* 右侧占位 */}
          <div className="right-nav"></div>
        </div>
      </header>

      {/* 页面主体布局 */}
      <div className="page-body">
        {/* 最左侧头像框 */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <img src={profilePicture} alt="Profile" className="profile-avatar-large" />
            <div className="profile-info">
              <h2>ianspace</h2>
              <p className="article-total">
                <span className="total-number">{totalArticles}</span>
                <span className="total-label">篇文章</span>
              </p>
            </div>
            <div className="profile-links">
              <div className="profile-link-item">
                <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                  <path d="M8 0a5 5 0 0 0-5 5c0 5 5 11 5 11s5-6 5-11a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span>Zhejiang Hangzhou</span>
              </div>
              <div className="profile-link-item">
                <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                  <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.25a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25V4.097L8.677 8.354a.75.75 0 0 1-.854 0L1.5 4.097v8.153zM8 7.129 1.823 2.75h12.354L8 7.129z"/>
                </svg>
                <span>ianspy@outlook.com</span>
              </div>
              <a href="https://ianspy.github.io" target="_blank" rel="noopener noreferrer" className="profile-link-item link">
                <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                  <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"/>
                </svg>
                <span>ianspy.github.io</span>
              </a>
            </div>
          </div>
          
          {/* 访客数量统计框 */}
          <div className="visitor-card">
            <div className="visitor-icon">
              <svg height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="visitor-info">
              <div className="visitor-count">{visitorCount.toLocaleString()}</div>
              <div className="visitor-label">总访问量</div>
            </div>
          </div>
        </aside>

        {/* 右侧主内容区 */}
        <div className="main-area">
          {/* 第二行 - 书签式 Tab 导航 */}
          <nav className="bookmark-tabs">
            <div className="tabs-container">
              {tabs.map(tab => {
                const previewText = tab.label.slice(0, 4)
                return (
                  <button
                    key={tab.id}
                    className={`bookmark-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    title={tab.label}
                  >
                    <span className="tab-short">{previewText}<span className="article-count">{tab.articles.length}</span></span>
                    <span className="tab-full">{tab.label}<span className="article-count">{tab.articles.length}</span></span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* 文章列表区 */}
          <main className="content-area">
            <h1>{activeTabData?.label}</h1>
            <div className="articles-list">
              {activeTabData?.articles.map((article, index) => (
                <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="article-card">
                  <h3>{article.title}</h3>
                </a>
              ))}
              {activeTabData?.articles.length === 0 && <p>暂无文章</p>}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
