import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  House,
  Info,
  LayoutDashboard,
  Mail,
  Menu,
  Plus,
  MessageSquareText,
  MoreHorizontal,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react"
import {
  PHOTO_CREDIT,
  people,
  photo,
  portrait,
  scenes,
  talents,
  type Talent,
} from "./photos"

type PortalRole = "talent" | "client" | "admin"
type Role = "gallery" | "overview" | PortalRole
type Icon = typeof House

const screens: Record<PortalRole, {
  label: string
  icon: Icon
}[]> = {
  talent: [
    { label: "ホーム", icon: House },
    { label: "新規登録", icon: UserRound },
    { label: "面談予約", icon: CalendarDays },
    { label: "プロフィール編集", icon: Settings },
    { label: "依頼詳細", icon: BriefcaseBusiness },
    { label: "契約内容", icon: FileCheck2 },
    { label: "報酬・入金", icon: WalletCards },
  ],
  client: [
    { label: "タレント検索", icon: Search },
    { label: "法人登録", icon: Building2 },
    { label: "タレント詳細", icon: UserRound },
    { label: "依頼フォーム", icon: FileText },
    { label: "見積・責任範囲", icon: ShieldCheck },
    { label: "契約・決済", icon: WalletCards },
    { label: "案件管理", icon: BriefcaseBusiness },
  ],
  admin: [
    { label: "ダッシュボード", icon: LayoutDashboard },
    { label: "タレント審査", icon: UserRound },
    { label: "案件管理", icon: BriefcaseBusiness },
    { label: "PR配信", icon: Send },
    { label: "振込承認", icon: WalletCards },
    { label: "相談・紛争窓口", icon: MessageSquareText },
  ],
}

const roleMeta = {
  talent: {
    label: "タレント",
    mark: "T",
    message: "今日から、あなたのマネージャーに。",
  },
  client: {
    label: "広告主",
    mark: "C",
    message: "1本の商品動画から、俳優に依頼できる。",
  },
  admin: { label: "運営", mark: "A", message: "安心な取引を、ひとつずつ。" },
}

function Button({
  children,
  variant = "primary",
  icon: ButtonIcon,
  onClick,
  className = "",
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
  icon?: Icon
  onClick?: () => void
  className?: string
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} onClick={onClick}>
      {ButtonIcon && <ButtonIcon size={17} strokeWidth={2} />}
      {children}
    </button>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: string
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function Avatar({
  name,
  size = "md",
}: {
  name: string
  size?: "sm" | "md" | "lg"
}) {
  const id = people[name]
  if (!id) return <span className={`avatar avatar-${size}`}>{name[0]}</span>
  return (
    <img
      className={`avatar avatar-img avatar-${size}`}
      src={portrait(id, 160)}
      alt={name}
      loading="lazy"
    />
  )
}

function PersonCell({ name }: { name: string }) {
  return (
    <span className="person-cell">
      <Avatar name={name} size="sm" />
      {name}
    </span>
  )
}

function Credit({ light }: { light?: boolean }) {
  return (
    <p className={light ? "photo-credit light" : "photo-credit"}>
      {PHOTO_CREDIT}
    </p>
  )
}

function SceneImage({
  id,
  alt,
  caption,
  className = "",
}: {
  id: string
  alt: string
  caption?: string
  className?: string
}) {
  return (
    <figure className={`scene-image ${className}`}>
      <img src={photo(id, 900, 600)} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Field({
  label,
  value,
  required,
  wide,
}: {
  label: string
  value: string
  required?: boolean
  wide?: boolean
}) {
  return (
    <label className={wide ? "field field-wide" : "field"}>
      <span className="field-label">
        {label} {required && <b>必須</b>}
      </span>
      <span className="input">
        {value}
        <ChevronDown size={16} />
      </span>
    </label>
  )
}

function AiNote({ children }: { children?: ReactNode }) {
  return (
    <div className="ai-note">
      <Sparkles size={17} />
      <div>
        {children && <strong>{children}</strong>}
        <span>AIは情報提供のみで、法的な判断はしません</span>
      </div>
    </div>
  )
}

function MoneyBreakdown({ total = "120,000円" }: { total?: string }) {
  return (
    <div className="money-card">
      <div className="money-head">
        <span>お金の内訳</span>
        <Badge tone="blue">支払予定</Badge>
      </div>
      <div className="money-row">
        <span>報酬額</span>
        <strong>{total}</strong>
      </div>
      <div className="money-row">
        <span>サービス手数料（20%）</span>
        <span>−24,000円</span>
      </div>
      <div className="money-row">
        <span>源泉徴収</span>
        <span>−12,252円</span>
      </div>
      <div className="money-total">
        <span>振込予定額</span>
        <strong>83,748円</strong>
      </div>
      <div className="money-date">
        <CalendarDays size={15} /> 2025年7月31日 振込予定
      </div>
    </div>
  )
}

function PageHead({
  eyebrow,
  title,
  desc,
  action,
}: {
  eyebrow?: string
  title: string
  desc?: string
  action?: ReactNode
}) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
      {action}
    </div>
  )
}

function AppHeader({
  role,
  setRole,
}: {
  role: Role
  setRole: (role: Role) => void
}) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => setRole("overview")}>
        <span className="brand-symbol">M</span>
        <span>マネージャーAI</span>
        <em>β</em>
      </button>
      <nav className="role-switch">
        <button
          className={role === "gallery" ? "active" : ""}
          onClick={() => setRole("gallery")}
        >
          画面一覧
        </button>
        <button
          className={role === "overview" ? "active" : ""}
          onClick={() => setRole("overview")}
        >
          概要
        </button>
        {(["talent", "client", "admin"] as const).map((item) => (
          <button
            key={item}
            className={role === item ? "active" : ""}
            onClick={() => setRole(item)}
          >
            {roleMeta[item].label}
          </button>
        ))}
      </nav>
      <div className="top-actions">
        <button aria-label="お知らせ">
          <Bell size={19} />
        </button>
        <Avatar name="佐藤 ケン" />
      </div>
    </header>
  )
}

function Overview({
  openRegistration,
  openDemo,
  initialAudience = "talent",
}: {
  initialAudience?: "talent" | "client"
  openRegistration: (role: "talent" | "client") => void
  openDemo: (role: "talent" | "client") => void
}) {
  const [audience, setAudience] = useState<"talent" | "client">(initialAudience)
  const isTalent = audience === "talent"
  const content = isTalent
    ? {
        eyebrow: "事務所に所属していない俳優・タレントの方へ",
        title: (
          <>
            今日から、あなたの
            <br />
            マネージャーに。
          </>
        ),
        lead: "出演の相談から契約、請求、源泉徴収まで。あなたが表現することに集中できるよう、必要な実務をひとつの場所で支えます。",
        image: photo(talents[0].photo, 1200),
        alt: "書斎で本を読む俳優のイメージ写真",
        stat: "案件ごとに明確",
        statLabel: "報酬・手数料・振込予定日",
      }
    : {
        eyebrow: "中小・中堅企業の広報・マーケティング担当者の方へ",
        title: (
          <>
            1本の商品動画から、
            <br />
            俳優に依頼できる。
          </>
        ),
        lead: "用途と予算からタレントを探し、見積・契約・決済までオンラインで完結。権利範囲と責任分担も、稟議前に明確にできます。",
        image: photo(talents[1].photo, 1200),
        alt: "出演者のイメージ写真",
        stat: "1本から相談可能",
        statLabel: "Web広告・商品動画への出演",
      }

  const talentServices = [
    [
      "営業・PR",
      "プロフィールを業界向けに紹介し、反応を見える化します。",
      Send,
      scenes.glass,
    ],
    [
      "契約サポート",
      "利用期間や二次利用など、見落としやすい条件を整理します。",
      FileCheck2,
      scenes.plaza,
    ],
    [
      "請求・税務手続き",
      "請求、源泉徴収、振込予定の管理をまとめて行います。",
      WalletCards,
      scenes.cityNight,
    ],
  ] as const
  const clientServices = [
    [
      "条件でタレント検索",
      "用途・予算・空き日から、案件に合う候補を探せます。",
      Search,
      scenes.street,
    ],
    [
      "見積と権利を明確に",
      "費用内訳、利用範囲、キャンセル時の対応を事前に確認できます。",
      ShieldCheck,
      scenes.plaza,
    ],
    [
      "契約・決済を一元化",
      "電子契約から支払い、権利期限の通知までまとめて管理します。",
      BriefcaseBusiness,
      scenes.cityNight,
    ],
  ] as const
  const services = isTalent ? talentServices : clientServices

  return (
    <main className={`marketing ${isTalent ? "for-talent" : "for-client"}`}>
      <section className="marketing-hero">
        <div className="audience-switch">
          <button
            className={isTalent ? "active" : ""}
            onClick={() => setAudience("talent")}
          >
            <UserRound size={16} />
            タレントの方
          </button>
          <button
            className={!isTalent ? "active" : ""}
            onClick={() => setAudience("client")}
          >
            <Building2 size={16} />
            広告主の方
          </button>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <span className="hero-eyebrow">{content.eyebrow}</span>
            <h1>{content.title}</h1>
            <p>{content.lead}</p>
            <div className="hero-actions">
              <Button onClick={() => openRegistration(audience)}>
                {isTalent ? "無料で登録をはじめる" : "法人登録をはじめる"}
                <ArrowRight size={17} />
              </Button>
              <Button variant="secondary" onClick={() => openDemo(audience)}>
                サービス画面を見る
              </Button>
            </div>
            <div className="hero-assurance">
              <span>
                <CheckCircle2 size={16} />
                登録料 0円
              </span>
              <span>
                <CheckCircle2 size={16} />
                契約前の料金発生なし
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img src={content.image} alt={content.alt} />
            <div className="hero-stat">
              <span>{content.stat}</span>
              <strong>{content.statLabel}</strong>
            </div>
            <div className="hero-faces">
              <div>
                {talents.slice(0, 5).map((t) => (
                  <img key={t.name} src={portrait(t.photo, 120)} alt="" />
                ))}
              </div>
              <span>
                {isTalent ? "プロフィールはこう届きます" : "演技のできる俳優へ直接依頼"}
              </span>
            </div>
            <div className="hero-trust">
              <ShieldCheck size={20} />
              <span>
                <strong>本人・法人確認を実施</strong>
                安心できる取引環境を整えます
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <span>取引のすべてを、わかりやすく</span>
        <div>
          <strong>20%</strong>
          <small>サービス手数料</small>
        </div>
        <div>
          <strong>80%</strong>
          <small>タレント報酬として支払い</small>
        </div>
        <div>
          <strong>明確</strong>
          <small>契約条件・支払期日</small>
        </div>
      </section>

      <section className="showcase-section">
        <div className="section-heading centered">
          <span>{isTalent ? "YOUR PROFILE" : "FIND YOUR CAST"}</span>
          <h2>
            {isTalent
              ? "宣材写真と実績が、そのまま営業資料に。"
              : "顔・雰囲気・実績から、直接選べる。"}
          </h2>
          <p>広告主の検索画面に表示されるプロフィールカードのイメージです。</p>
        </div>
        <div className="showcase-track">
          {[...talents, ...talents].map((t, i) => (
            <figure className="showcase-card" key={`${t.name}-${i}`}>
              <img src={portrait(t.photo, 520)} alt={`${t.name}（モデル写真）`} loading="lazy" />
              <figcaption>
                <strong>{t.name}</strong>
                <span>
                  {t.role} / {t.area}
                </span>
                <em>{t.tags[0]}</em>
              </figcaption>
            </figure>
          ))}
        </div>
        <Credit />
      </section>

      <section className="marketing-section">
        <div className="section-heading centered">
          <span>{isTalent ? "YOUR MANAGER" : "SIMPLE CASTING"}</span>
          <h2>
            {isTalent
              ? "ひとりで抱えていた実務に、伴走します。"
              : "はじめてのキャスティングも、迷わず進められます。"}
          </h2>
          <p>
            {isTalent
              ? "営業から入金まで、仕事の前後に必要なことを一つのサービスで。"
              : "探す・依頼する・社内で承認を得る。そのすべてをわかりやすく。"}
          </p>
        </div>
        <div className="service-grid">
          {services.map(([title, desc, ServiceIcon, image], index) => (
            <article key={title}>
              <img
                className="service-photo"
                src={photo(image, 720, 440)}
                alt=""
                loading="lazy"
              />
              <span className="service-number">0{index + 1}</span>
              <div className="service-icon">
                <ServiceIcon size={23} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-section">
        <div className="flow-copy">
          <div className="section-heading">
            <span>HOW IT WORKS</span>
            <h2>
              {isTalent
                ? "登録から入金まで、見通せる。"
                : "相談から公開まで、シンプルに。"}
            </h2>
            <p>
              いま何をすべきか、次に何が起きるかを、ステータスでお知らせします。
            </p>
          </div>
          <div className="flow-list">
            {(isTalent
              ? [
                  [
                    "登録・本人確認",
                    "プロフィール入力後、15分のオンライン面談",
                  ],
                  ["依頼を確認", "条件と報酬を確認して、承諾または辞退"],
                  ["契約・撮影", "やさしい要約と原文を確認して電子契約"],
                  ["入金", "控除額と振込予定日を事前に確認"],
                ]
              : [
                  ["法人登録", "企業情報と担当者情報を登録"],
                  ["検索・依頼", "用途、予算、空き日から候補を選択"],
                  ["見積・契約", "費用と権利範囲を確認して社内承認"],
                  ["撮影・管理", "納品から権利期限まで一元管理"],
                ]
            ).map(([title, desc], index) => (
              <div key={title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="transparency-card">
          <span className="mini-label">TRANSPARENCY</span>
          <h3>
            {isTalent
              ? "受け取る金額を、契約前に。"
              : "支払う金額を、稟議前に。"}
          </h3>
          <div className="transparent-row">
            <span>{isTalent ? "報酬額" : "出演料"}</span>
            <strong>120,000円</strong>
          </div>
          <div className="transparent-row">
            <span>{isTalent ? "サービス手数料（20%）" : "サービス利用料"}</span>
            <span>{isTalent ? "−24,000円" : "30,000円"}</span>
          </div>
          <div className="transparent-row">
            <span>{isTalent ? "源泉徴収" : "消費税"}</span>
            <span>{isTalent ? "−12,252円" : "15,000円"}</span>
          </div>
          <div className="transparent-total">
            <span>{isTalent ? "振込予定額" : "お支払い総額"}</span>
            <strong>{isTalent ? "83,748円" : "165,000円"}</strong>
          </div>
          <p>
            <CalendarDays size={15} />
            {isTalent
              ? "振込予定日：2025年7月31日"
              : "見積有効期限：2025年6月30日"}
          </p>
        </div>
      </section>

      <section className="scene-band">
        <SceneImage
          className="tall"
          id="ueno"
          alt="石段でポーズをとるモデル"
          caption="ロケ撮影のイメージ"
        />
        <SceneImage
          id="ishida"
          alt="スーツケースを持つモデル"
          caption="観光PR動画のイメージ"
        />
        <SceneImage
          id="hasegawa"
          alt="夜の街に立つモデル"
          caption="ミュージックビデオのイメージ"
        />
      </section>

      <section className="safety-section">
        <div>
          <span className="mini-label">SAFETY & SUPPORT</span>
          <h2>安心して判断できる仕組みを。</h2>
        </div>
        <div className="safety-grid">
          <article>
            <ShieldCheck size={22} />
            <strong>契約条件を明確に</strong>
            <p>媒体・期間・二次利用・競合排除を、契約前に双方で確認します。</p>
          </article>
          <article>
            <MessageSquareText size={22} />
            <strong>相談窓口を用意</strong>
            <p>条件や進行に不安があるときは、運営へ相談できます。</p>
          </article>
          <article>
            <Sparkles size={22} />
            <strong>AIで確認をサポート</strong>
            <p>
              見落としやすい条件を整理し、「気になる点」としてお伝えします。
            </p>
          </article>
        </div>
        <AiNote />
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <span>FAQ</span>
          <h2>よくあるご質問</h2>
        </div>
        <div>
          {(isTalent
            ? [
                [
                  "登録に費用はかかりますか？",
                  "登録料はかかりません。案件成立時に報酬額の20%をサービス手数料としていただきます。",
                ],
                [
                  "依頼は必ず受ける必要がありますか？",
                  "いいえ。条件を確認したうえで、ご自身で承諾または辞退を選べます。",
                ],
                [
                  "事務所に所属していても使えますか？",
                  "所属契約の内容によって異なります。事前に所属先へご確認ください。",
                ],
              ]
            : [
                [
                  "相談だけでも可能ですか？",
                  "はい。具体的なタレントが決まっていない段階でも、用途や予算からご相談いただけます。",
                ],
                [
                  "費用はいつ発生しますか？",
                  "見積確認までは料金は発生しません。契約・決済条件を確定したうえで進行します。",
                ],
                [
                  "動画はどこまで利用できますか？",
                  "媒体・期間・二次利用の範囲を契約に明記します。範囲外の利用には追加の合意が必要です。",
                ],
              ]
          ).map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>＋</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className="final-cta"
        style={{
          backgroundImage: `linear-gradient(rgba(20,22,52,.78),rgba(20,22,52,.86)),url(${photo(
            isTalent ? scenes.cityNight : scenes.glass,
            1600,
          )})`,
        }}
      >
        <span>{isTalent ? "FOR TALENT" : "FOR BUSINESS"}</span>
        <h2>
          {isTalent
            ? "あなたの次の一歩を、一緒に。"
            : "次の商品動画に、プロの表現力を。"}
        </h2>
        <p>
          {isTalent
            ? "プロフィール登録から、活動の新しい選択肢をはじめましょう。"
            : "まずは法人情報を登録して、タレントを探してみましょう。"}
        </p>
        <Button onClick={() => openRegistration(audience)}>
          {isTalent ? "無料で登録をはじめる" : "法人登録をはじめる"}
          <ArrowRight size={17} />
        </Button>
        <small>登録料 0円・入力途中でも保存できます</small>
        <Credit light />
      </section>
    </main>
  )
}

function Registration({ role }: { role: "talent" | "client" }) {
  const isTalent = role === "talent"
  return (
    <div className="form-page">
      <PageHead
        eyebrow={isTalent ? "STEP 1 OF 3" : "STEP 1 OF 2"}
        title={
          isTalent ? "まず、あなたのことを教えてください" : "法人情報を登録"
        }
        desc={
          isTalent
            ? "入力途中でも自動で保存されます。5分ほどで完了します。"
            : "安心なお取引のため、登記情報と担当者情報を確認します。"
        }
      />
      <div className="form-banner">
        <img
          src={
            isTalent
              ? photo(scenes.street)
              : photo(scenes.plaza)
          }
          alt=""
        />
        <div>
          <strong>
            {isTalent
              ? "あなたの活動を、裏方から支えます。"
              : "はじめてのキャスティングも、画面ひとつで。"}
          </strong>
          <span>
            {isTalent
              ? "登録後、15分のオンライン面談で本人確認を行います。"
              : "登録後すぐに、タレント検索と見積作成を始められます。"}
          </span>
        </div>
      </div>
      <div className="progress">
        <i></i>
        <span></span>
        <span></span>
      </div>
      <div className="form-card">
        <h2>{isTalent ? "基本情報" : "企業情報"}</h2>
        <div className="field-grid">
          <Field
            label={isTalent ? "本名" : "法人名"}
            value={isTalent ? "佐藤　健一" : "株式会社 山川食品"}
            required
          />
          <Field
            label={isTalent ? "芸名" : "法人番号"}
            value={isTalent ? "佐藤 ケン" : "1234 5678 9012"}
          />
          <Field
            label={isTalent ? "生年月日" : "所在地"}
            value={isTalent ? "1987年 4月 18日" : "長野県松本市…"}
            required
          />
          <Field
            label={isTalent ? "電話番号" : "担当部署"}
            value={isTalent ? "090-1234-5678" : "広報室"}
            required
          />
        </div>
        {isTalent && (
          <div className="minor-note">
            <Info size={18} />
            <span>
              <strong>未成年の方へ</strong>
              次のステップで保護者情報をご入力ください。
            </span>
          </div>
        )}
        <div className="form-actions">
          <span>入力内容は安全に管理されます</span>
          <Button>
            次へ進む <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

function TalentHome() {
  return (
    <div>
      <div className="mobile-greeting">
        <div>
          <span>こんにちは、佐藤さん</span>
          <h1>今日も一緒に進めましょう。</h1>
        </div>
        <Avatar name="佐藤 ケン" size="lg" />
      </div>
      <div className="mobile-metrics">
        <div>
          <span>入金予定</span>
          <strong>¥83,748</strong>
          <small>7月31日</small>
        </div>
        <div>
          <span>PRの反応</span>
          <strong>
            12<small>件</small>
          </strong>
          <small>今月 +4件</small>
        </div>
      </div>
      <section className="mobile-section">
        <div className="section-title">
          <h2>新着の依頼</h2>
          <button>すべて見る</button>
        </div>
        <article className="request-card featured">
          <img
            className="request-cover"
            src={photo(scenes.street)}
            alt="オフィス街の写真"
          />
          <div className="request-top">
            <Badge tone="orange">新着</Badge>
            <span>回答期限 6/18</span>
          </div>
          <div className="company-logo">YK</div>
          <div>
            <small>山川食品株式会社</small>
            <h3>
              新商品「信州りんごジュース」
              <br />
              Web動画へのご出演
            </h3>
          </div>
          <div className="request-meta">
            <span>
              <WalletCards size={15} />
              報酬 120,000円
            </span>
            <span>
              <CalendarDays size={15} />
              撮影 7/8
            </span>
          </div>
          <Button>
            依頼内容を見る <ArrowRight size={16} />
          </Button>
        </article>
      </section>
      <section className="mobile-section">
        <div className="section-title">
          <h2>進行中の案件</h2>
          <span>2件</span>
        </div>
        {[
          ["温泉旅館 ブランドムービー", "次の予定：衣装確認 6/20", "ueno"],
          ["地域銀行 採用動画", "次の予定：撮影 6/27", scenes.glass],
        ].map(([title, next, image]) => (
          <article className="compact-job" key={title}>
            <img className="job-thumb" src={photo(image, 200, 200)} alt="" />
            <div>
              <Badge tone="blue">進行中</Badge>
              <h3>{title}</h3>
              <p>{next}</p>
            </div>
            <ArrowRight size={18} />
          </article>
        ))}
      </section>
      <section className="mobile-section">
        <div className="section-title">
          <h2>PR配信で紹介中</h2>
          <span>今月 3社が閲覧</span>
        </div>
        <div className="pr-preview">
          <img src={portrait(talents[0].photo, 300)} alt="佐藤 ケンの宣材写真" />
          <div>
            <small>広告制作会社・映像制作会社向け</small>
            <strong>新加入俳優のご紹介：佐藤 ケン</strong>
            <span>開封 38% ・ プロフィール閲覧 12件</span>
          </div>
        </div>
      </section>
      <AiNote />
    </div>
  )
}

function Booking() {
  const days = ["17 火", "18 水", "19 木", "20 金", "21 土"]
  return (
    <div>
      <PageHead
        eyebrow="本人確認"
        title="15分のオンライン面談を予約"
        desc="ご本人確認と、活動について簡単にお話を伺います。"
      />
      <div className="privacy-note">
        <ShieldCheck size={22} />
        <div>
          <strong>身分証の画像は保存しません</strong>
          <span>
            面談中に画面越しで確認し、確認日・確認者・書類種別のみ記録します。
          </span>
        </div>
      </div>
      <div className="calendar-card">
        <div className="calendar-head">
          <Button variant="ghost" icon={ArrowLeft}>
            前の週
          </Button>
          <strong>2025年 6月</strong>
          <Button variant="ghost">
            次の週 <ArrowRight size={16} />
          </Button>
        </div>
        <div className="calendar-days">
          {days.map((day, i) => (
            <div className={i === 2 ? "selected" : ""} key={day}>
              <span>{day.split(" ")[1]}</span>
              <strong>{day.split(" ")[0]}</strong>
            </div>
          ))}
        </div>
        <div className="time-grid">
          {["10:00", "10:30", "11:00", "13:00", "14:30", "16:00"].map(
            (time) => (
              <button className={time === "11:00" ? "active" : ""} key={time}>
                {time}
              </button>
            ),
          )}
        </div>
        <Button className="full">6月19日（木）11:00 で予約する</Button>
      </div>
    </div>
  )
}

function ProfileEdit() {
  return (
    <div>
      <PageHead
        title="プロフィール編集"
        desc="広告主に公開される内容です。"
        action={<Button variant="secondary">プレビュー</Button>}
      />
      <div className="profile-photo">
        <img
          className="portrait"
          src={portrait(talents[0].photo, 200)}
          alt="佐藤 ケンのプロフィール写真"
        />
        <div>
          <strong>プロフィール写真</strong>
          <span>顔が明るく見える写真がおすすめです</span>
          <Button variant="ghost">写真を変更</Button>
        </div>
      </div>
      <div className="gallery-block">
        <div className="section-title">
          <h2>宣材写真・出演シーン</h2>
          <span>最大12枚</span>
        </div>
        <div className="gallery-grid">
          {[talents[0].photo, talents[0].photo, scenes.street, scenes.cityNight].map(
            (id, i) => (
              <img
                key={`${id}-${i}`}
                src={i === 0 ? portrait(id) : photo(id)}
                alt=""
                loading="lazy"
              />
            ),
          )}
          <button className="gallery-add">
            <Plus size={20} />
            写真を追加
          </button>
        </div>
      </div>
      <div className="form-card flat">
        <div className="field-grid">
          <Field label="芸名" value="佐藤 ケン" required />
          <Field label="希望単価" value="100,000円〜" required />
          <Field label="主な実績" value="ドラマ・舞台・Web CM…" wide />
          <Field label="NG条件" value="アルコール、過度な肌露出" wide />
          <Field label="空き日" value="カレンダーから選択" wide />
        </div>
        <Button className="full">変更を保存</Button>
      </div>
    </div>
  )
}

function RequestDetail() {
  return (
    <div>
      <Button variant="ghost" icon={ArrowLeft}>
        依頼一覧
      </Button>
      <PageHead
        eyebrow="回答期限 6月18日 18:00"
        title="信州りんごジュース Web動画"
        desc="山川食品株式会社からの出演依頼"
      />
      <img
        className="detail-cover"
        src={photo(scenes.street)}
        alt="オフィス街の写真"
      />
      <div className="status-line">
        <Badge tone="orange">依頼中</Badge>
        <span>受信：6月14日</span>
      </div>
      <div className="detail-card">
        <h2>依頼条件</h2>
        <dl>
          <div>
            <dt>媒体</dt>
            <dd>Web広告（SNS・YouTube）</dd>
          </div>
          <div>
            <dt>利用期間</dt>
            <dd>公開から6か月</dd>
          </div>
          <div>
            <dt>二次利用</dt>
            <dd>公式SNSへの転載あり</dd>
          </div>
          <div>
            <dt>競合排除</dt>
            <dd>飲料カテゴリ・3か月</dd>
          </div>
        </dl>
      </div>
      <div className="detail-card">
        <h2>絵コンテ・参考イメージ</h2>
        <div className="reference-grid">
          {[
            ["mizuno", "室内・自然光"],
            ["ishida", "屋外ロケ"],
            ["kobayashi", "公園での撮影"],
          ].map(([id, label]) => (
            <SceneImage key={id} id={id} alt={label} caption={label} />
          ))}
        </div>
      </div>
      <div className="concern-card">
        <div>
          <Sparkles size={18} />
          <strong>AI条件チェック：気になる点</strong>
        </div>
        <p>
          二次利用の対象SNSが明記されています。切り抜き編集の可否は、承諾前に確認しておくと安心です。
        </p>
        <button>
          広告主へ確認する <ArrowRight size={15} />
        </button>
      </div>
      <MoneyBreakdown />
      <AiNote />
      <div className="sticky-actions">
        <Button variant="secondary">今回は辞退する</Button>
        <Button>条件を確認して承諾</Button>
      </div>
    </div>
  )
}

function Contract() {
  return (
    <div>
      <PageHead
        eyebrow="契約締結待ち"
        title="契約内容を確認"
        desc="難しい表現を、要点ごとにやさしくまとめました。"
        action={
          <Button variant="secondary" icon={FileText}>
            契約書原文
          </Button>
        }
      />
      <AiNote>AIによるやさしい要約</AiNote>
      <div className="summary-list">
        {[
          [
            "01",
            "お願いされること",
            "7月8日の撮影に参加し、商品の紹介動画に出演します。",
          ],
          [
            "02",
            "動画が使われる場所と期間",
            "YouTube・Instagram・企業サイトで、公開から6か月間使われます。",
          ],
          [
            "03",
            "キャンセルについて",
            "撮影7日前以降の辞退には、実費が発生する場合があります。",
          ],
        ].map(([n, t, d]) => (
          <div key={n}>
            <span>{n}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="lawyer-card">
        <CircleHelp size={22} />
        <div>
          <strong>判断に迷う点がありますか？</strong>
          <span>契約前に専門家へ相談できます。</span>
        </div>
        <Button variant="secondary">弁護士に相談する</Button>
      </div>
      <div className="sticky-actions">
        <Button variant="secondary">修正を依頼</Button>
        <Button>内容に同意して署名へ</Button>
      </div>
    </div>
  )
}

function Payments() {
  return (
    <div>
      <PageHead
        title="報酬・入金"
        desc="報酬と控除額、振込予定をいつでも確認できます。"
        action={
          <Button variant="secondary" icon={Download}>
            確定申告用データ
          </Button>
        }
      />
      <div className="payment-hero">
        <span>2025年の振込予定額</span>
        <strong>¥ 328,420</strong>
        <small>支払済み ¥244,672 ・ 予定 ¥83,748</small>
      </div>
      <div className="tab-line">
        <button className="active">入金予定</button>
        <button>支払済み</button>
      </div>
      {[
        ["7月31日予定", "信州りんごジュース Web動画", "山川食品株式会社", "83,748円", scenes.street],
        ["8月31日予定", "温泉旅館 ブランドムービー", "温泉旅館さくら", "112,320円", "ueno"],
      ].map(([date, title, company, amount, image]) => (
        <div className="payment-item" key={title}>
          <img className="job-thumb" src={photo(image, 200, 200)} alt="" />
          <div>
            <Badge tone="blue">{date}</Badge>
            <h3>{title}</h3>
            <span>{company}</span>
          </div>
          <strong>{amount}</strong>
        </div>
      ))}
      <MoneyBreakdown />
    </div>
  )
}

function TalentScreen({ screen }: { screen: string }) {
  if (screen === "ホーム") return <TalentHome />
  if (screen === "新規登録") return <Registration role="talent" />
  if (screen === "面談予約") return <Booking />
  if (screen === "プロフィール編集") return <ProfileEdit />
  if (screen === "依頼詳細") return <RequestDetail />
  if (screen === "契約内容") return <Contract />
  return <Payments />
}

function TalentSearch() {
  return (
    <div>
      <PageHead
        title="タレントを探す"
        desc="用途やご予算に合う俳優へ、直接出演を依頼できます。"
        action={<Button icon={Sparkles}>AIに相談して探す</Button>}
      />
      <div className="search-bar">
        <Search size={20} />
        <span>名前・特徴・実績で検索</span>
        <Button>検索</Button>
      </div>
      <div className="filter-row">
        <button>
          用途：商品動画 <X size={14} />
        </button>
        <button>
          予算：〜15万円 <X size={14} />
        </button>
        <button>
          空き日：7月 <X size={14} />
        </button>
        <button className="filter-more">
          絞り込み <ChevronDown size={14} />
        </button>
      </div>
      <div className="recommend-banner">
        <div>
          <Sparkles size={20} />
          <span>
            <strong>AIのおすすめ</strong>
            ご指定の条件と過去実績をもとに、相性の良い3名を選びました。
          </span>
        </div>
        <AiNote />
      </div>
      <div className="talent-grid">
        {talents.map((talent) => (
          <article className="talent-card" key={talent.name}>
            <div className="talent-image">
              <img
                src={portrait(talent.photo, 560)}
                alt={`${talent.name}（モデル写真）`}
                loading="lazy"
              />
              {talent.pick && <Badge tone="orange">AIのおすすめ</Badge>}
              <span className="talent-age">{talent.age}歳</span>
            </div>
            <div>
              <div className="talent-name">
                <h3>{talent.name}</h3>
                <Star size={17} fill="currentColor" />
              </div>
              <p>
                {talent.role} / {talent.area}
              </p>
              <div className="tag-row">
                {talent.tags.slice(0, 2).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="price-row">
                <span>料金の目安</span>
                <strong>{talent.price}</strong>
              </div>
              <Button variant="secondary" className="full">
                プロフィールを見る
              </Button>
            </div>
          </article>
        ))}
      </div>
      <Credit />
    </div>
  )
}

function SimilarTalents({ exclude }: { exclude: Talent }) {
  return (
    <div className="similar-row">
      {talents
        .filter((t) => t.name !== exclude.name)
        .slice(0, 4)
        .map((t) => (
          <figure key={t.name}>
            <img src={portrait(t.photo, 300)} alt={`${t.name}（モデル写真）`} loading="lazy" />
            <figcaption>
              <strong>{t.name}</strong>
              <span>{t.price}</span>
            </figcaption>
          </figure>
        ))}
    </div>
  )
}

function TalentDetail() {
  return (
    <div>
      <Button variant="ghost" icon={ArrowLeft}>
        検索結果
      </Button>
      <div className="talent-detail-hero">
        <img
          className="large-portrait"
          src={portrait(talents[0].photo, 480)}
          alt="佐藤 ケン（モデル写真）"
        />
        <div>
          <Badge tone="green">本人確認済み</Badge>
          <h1>佐藤 ケン</h1>
          <p>俳優・モデル　東京都 / 38歳</p>
          <div className="tag-row">
            <span>自然な演技</span>
            <span>父親役</span>
            <span>企業VP</span>
          </div>
        </div>
        <div className="detail-cta">
          <span>料金の目安</span>
          <strong>100,000円〜</strong>
          <small>条件により変動します</small>
          <Button>このタレントに依頼</Button>
        </div>
      </div>
      <div className="two-col">
        <div>
          <section className="detail-card">
            <h2>プロフィール</h2>
            <p className="body-copy">
              舞台を中心に15年活動。親しみやすく落ち着いた人物像を得意とし、企業のブランドムービーやWeb
              CMへの出演実績があります。
            </p>
          </section>
          <section className="detail-card">
            <h2>主な実績</h2>
            <ul className="work-list">
              <li>
                <span>2024</span>地域銀行 ブランドムービー
              </li>
              <li>
                <span>2023</span>食品メーカー Web CM
              </li>
              <li>
                <span>2023</span>連続ドラマ 第4話
              </li>
            </ul>
          </section>
          <section className="detail-card">
            <h2>撮影ロケーション例</h2>
            <div className="reference-grid">
              {[
                [scenes.cityNight, "夜景ロケ"],
                [scenes.street, "オフィス街"],
                [scenes.plaza, "都市景観"],
              ].map(([id, label]) => (
                <SceneImage key={id} id={id} alt={label} caption={label} />
              ))}
            </div>
          </section>
          <section className="detail-card">
            <h2>このタレントを見た人は、こちらも検討しています</h2>
            <SimilarTalents exclude={talents[0]} />
            <Credit />
          </section>
        </div>
        <aside>
          <div className="availability-card">
            <CalendarDays size={20} />
            <strong>直近の空き状況</strong>
            <p>7月前半に空きがあります</p>
            <div>
              <span>7/3</span>
              <span>7/8</span>
              <span>7/11</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function RequestForm() {
  return (
    <div>
      <PageHead
        eyebrow="依頼作成 / STEP 2 OF 4"
        title="利用条件を入力"
        desc="権利の範囲を明確にするため、すべて必須です。"
      />
      <div className="steps">
        <span className="done">
          <Check size={14} />
          用途
        </span>
        <i></i>
        <span className="active">2 条件</span>
        <i></i>
        <span>3 資料</span>
        <i></i>
        <span>4 見積</span>
      </div>
      <div className="target-talent">
        <img src={portrait(talents[0].photo, 160)} alt="佐藤 ケン" />
        <div>
          <small>依頼先</small>
          <strong>佐藤 ケン</strong>
          <span>俳優・モデル / 料金の目安 10万円〜</span>
        </div>
        <Badge tone="green">本人確認済み</Badge>
      </div>
      <div className="form-card">
        <div className="field-grid">
          <Field label="用途" value="新商品の紹介動画" required />
          <Field label="媒体" value="YouTube / Instagram" required />
          <Field label="利用期間" value="公開から6か月" required />
          <Field label="二次利用" value="公式SNSへの転載あり" required />
          <Field label="競合排除" value="飲料カテゴリ・3か月" required />
          <Field label="撮影希望日" value="2025年7月8日" required />
        </div>
        <div className="upload">
          <FileText size={25} />
          <div>
            <strong>絵コンテPDFを添付</strong>
            <span>PDF・最大20MB</span>
          </div>
          <Button variant="secondary">ファイルを選択</Button>
        </div>
        <div className="form-actions">
          <Button variant="ghost">下書き保存</Button>
          <Button>
            見積を確認 <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Quote() {
  return (
    <div>
      <PageHead
        title="見積・責任範囲の確認"
        desc="社内稟議に必要な費用と条件を、ひとつにまとめています。"
        action={
          <Button variant="secondary" icon={Download}>
            稟議用PDF
          </Button>
        }
      />
      <div className="quote-layout">
        <div className="detail-card">
          <h2>お見積り</h2>
          <div className="quote-talent">
            <img src={portrait(talents[0].photo, 120)} alt="佐藤 ケン" />
            <div>
              <strong>佐藤 ケン</strong>
              <span>信州りんごジュース Web動画 / 撮影 7月8日</span>
            </div>
          </div>
          <div className="quote-row">
            <span>出演料</span>
            <strong>120,000円</strong>
          </div>
          <div className="quote-row">
            <span>サービス利用料</span>
            <strong>30,000円</strong>
          </div>
          <div className="quote-row">
            <span>消費税</span>
            <strong>15,000円</strong>
          </div>
          <div className="quote-total">
            <span>お支払い総額</span>
            <strong>165,000円</strong>
          </div>
          <small>
            タレントへの支払い・源泉徴収手続きは当サービスが行います。
          </small>
        </div>
        <div className="scope-card">
          <h2>
            <ShieldCheck size={21} />
            責任範囲
          </h2>
          {[
            [
              "ドタキャン時",
              "当サービスが条件に合う代役候補を速やかにご提案します。",
            ],
            ["権利の範囲", "YouTube・Instagram・企業サイト / 公開から6か月"],
            ["成果物の管理", "契約範囲外での利用には、別途合意が必要です。"],
          ].map(([t, d]) => (
            <div key={t}>
              <strong>{t}</strong>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="approval-note">
        <Info size={18} />
        この見積の有効期限は2025年6月30日です。契約締結までは料金は発生しません。
      </div>
      <div className="right-action">
        <Button>この内容で社内承認へ</Button>
      </div>
    </div>
  )
}

function ContractPayment() {
  return (
    <div>
      <PageHead
        title="契約・決済"
        desc="契約とお支払いの進捗を確認できます。"
      />
      <div className="contract-progress">
        {[
          ["契約内容の合意", true],
          ["電子署名", true],
          ["お支払い", false],
          ["契約完了", false],
        ].map(([name, done], i) => (
          <div
            key={String(name)}
            className={done ? "done" : i === 2 ? "current" : ""}
          >
            <span>{done ? <Check size={16} /> : i + 1}</span>
            <strong>{name}</strong>
          </div>
        ))}
      </div>
      <div className="quote-layout">
        <div className="detail-card">
          <h2>電子契約</h2>
          <div className="signature-row">
            <div>
              <Badge tone="green">広告主 署名済み</Badge>
              <span>6月17日 14:32</span>
            </div>
            <div>
              <span className="person-cell">
                <Avatar name="佐藤 ケン" size="sm" />
                <Badge tone="orange">タレント 署名待ち</Badge>
              </span>
              <span>回答期限 6月19日</span>
            </div>
          </div>
          <Button variant="secondary" icon={FileText}>
            契約書を表示
          </Button>
        </div>
        <div className="detail-card">
          <h2>お支払い方法</h2>
          <div className="payment-method active">
            <WalletCards size={20} />
            <div>
              <strong>請求書払い</strong>
              <span>10万円を超えるため、請求書払いとなります</span>
            </div>
            <CheckCircle2 size={19} />
          </div>
          <div className="invoice-info">
            <span>支払期限</span>
            <strong>2025年6月30日</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientProjects() {
  return (
    <div>
      <PageHead
        title="案件管理"
        desc="依頼から支払いまで、すべての進捗を確認できます。"
        action={<Button>新しい依頼を作成</Button>}
      />
      <div className="table-card">
        <div className="table-tools">
          <div className="tab-line">
            <button className="active">すべて 8</button>
            <button>進行中 3</button>
            <button>要対応 2</button>
          </div>
          <div className="mini-search">
            <Search size={16} />
            案件名を検索
          </div>
        </div>
        <div className="data-table">
          <div className="tr th">
            <span>案件</span>
            <span>タレント</span>
            <span>ステータス</span>
            <span>権利期限</span>
            <span>金額</span>
            <span></span>
          </div>
          {[
            [
              "信州りんごジュース Web動画",
              "佐藤 ケン",
              "契約締結待ち",
              "2026/01/15",
              "165,000円",
            ],
            [
              "夏の採用ブランドムービー",
              "水野 あかり",
              "進行中",
              "2026/02/01",
              "220,000円",
            ],
            [
              "温泉旅館 SNS広告",
              "森 さくら",
              "納品済み",
              "残り30日",
              "143,000円",
            ],
          ].map((row, i) => (
            <div className="tr" key={row[0]}>
              <span>
                <strong>{row[0]}</strong>
                <small>#PJ-250{8 - i}</small>
              </span>
              <PersonCell name={row[1]} />
              <span>
                <Badge tone={i === 0 ? "purple" : i === 1 ? "blue" : "green"}>
                  {row[2]}
                </Badge>
              </span>
              <span className={i === 2 ? "warning-text" : ""}>{row[3]}</span>
              <span>{row[4]}</span>
              <MoreHorizontal size={18} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClientScreen({ screen }: { screen: string }) {
  if (screen === "タレント検索") return <TalentSearch />
  if (screen === "法人登録") return <Registration role="client" />
  if (screen === "タレント詳細") return <TalentDetail />
  if (screen === "依頼フォーム") return <RequestForm />
  if (screen === "見積・責任範囲") return <Quote />
  if (screen === "契約・決済") return <ContractPayment />
  return <ClientProjects />
}

function AdminDashboard() {
  return (
    <div>
      <PageHead
        title="ダッシュボード"
        desc="2025年6月18日（水）の状況"
        action={
          <Button variant="secondary" icon={Download}>
            日次レポート
          </Button>
        }
      />
      <div className="admin-metrics">
        {[
          ["審査待ち", "8", "3件 本日期限", "orange"],
          ["進行中案件", "24", "前週 +3", "blue"],
          ["未入金", "3", "計 420,000円", "red"],
          ["要対応アラート", "5", "高優先度 2件", "purple"],
        ].map(([t, n, d, tone]) => (
          <div key={t}>
            <span className={`metric-icon ${tone}`}>
              <BriefcaseBusiness size={19} />
            </span>
            <small>{t}</small>
            <strong>{n}</strong>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <div className="admin-grid">
        <div className="table-card">
          <div className="card-head">
            <h2>要対応</h2>
            <button>すべて見る</button>
          </div>
          {[
            ["支払期日が本日です", "信州工務店 / PJ-2498", "高"],
            ["タレントの回答期限まで3時間", "山川食品 / PJ-2508", "中"],
            ["権利期限が30日後です", "温泉旅館さくら / PJ-2481", "低"],
          ].map(([t, d, p], i) => (
            <div className="alert-row" key={t}>
              <span className={`priority p${i}`}>{p}</span>
              <div>
                <strong>{t}</strong>
                <small>{d}</small>
              </div>
              <ArrowRight size={17} />
            </div>
          ))}
        </div>
        <div className="table-card">
          <div className="card-head">
            <h2>案件ステータス</h2>
            <span>全42件</span>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <span>
                <strong>42</strong>案件
              </span>
            </div>
            <ul>
              <li>
                <i className="dot blue"></i>進行中 <b>24</b>
              </li>
              <li>
                <i className="dot purple"></i>契約待ち <b>8</b>
              </li>
              <li>
                <i className="dot green"></i>納品済み <b>6</b>
              </li>
              <li>
                <i className="dot gray"></i>支払済み <b>4</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="table-card newcomer-card">
        <div className="card-head">
          <h2>今週の新規登録タレント</h2>
          <button>審査一覧へ</button>
        </div>
        <div className="newcomer-row">
          {["森田 まこ", "石田 梨沙", "西村 あかね", "上野 ひな", "大川 せな"].map(
            (name, i) => (
              <figure key={name}>
                <img src={portrait(people[name], 300)} alt={`${name}（モデル写真）`} />
                <figcaption>
                  <strong>{name}</strong>
                  <Badge tone={i < 3 ? "orange" : "blue"}>
                    {i < 3 ? "面談待ち" : "書類確認"}
                  </Badge>
                </figcaption>
              </figure>
            ),
          )}
        </div>
        <Credit />
      </div>
    </div>
  )
}

function AdminTable({ type }: { type: string }) {
  const content: Record<string, {
    title: string
    desc: string
    action: string
    heads: string[]
    rows: string[][]
  }> = {
    タレント審査: {
      title: "タレント審査",
      desc: "面談予約と本人確認の記録を管理します。",
      action: "面談枠を設定",
      heads: ["予約日時", "タレント", "書類種別", "確認者", "状態"],
      rows: [
        ["6/18 10:00", "森田 まこ", "運転免許証", "未割当", "面談待ち"],
        ["6/18 14:30", "石田 梨沙", "マイナンバーカード", "田中", "確認中"],
        ["6/19 11:00", "西村 あかね", "パスポート", "佐々木", "面談待ち"],
      ],
    },
    案件管理: {
      title: "全案件",
      desc: "契約・納品・支払いの状況を横断管理します。",
      action: "案件を登録",
      heads: ["案件", "広告主", "ステータス", "支払期日", "担当"],
      rows: [
        ["PJ-2508 信州りんご", "山川食品", "契約締結待ち", "6/30", "田中"],
        ["PJ-2507 採用動画", "青葉製作所", "進行中", "7/31", "田中"],
        ["PJ-2498 会社紹介", "信州工務店", "納品済み", "本日", "佐々木"],
      ],
    },
    PR配信: {
      title: "PR配信",
      desc: "業界別リストへ、新しいタレント情報を届けます。",
      action: "新規メール作成",
      heads: ["件名", "配信リスト", "送信日", "開封率", "状態"],
      rows: [
        ["新加入俳優3名のご紹介", "広告制作会社", "6/17", "38.4%", "配信済み"],
        ["企業VPに強い俳優特集", "映像制作会社", "6/10", "42.1%", "配信済み"],
        ["7月の空きタレント", "地方企業・広報", "6/20", "—", "下書き"],
      ],
    },
    振込承認: {
      title: "振込承認",
      desc: "高額・例外振込は2名の承認後に実行されます。",
      action: "振込履歴",
      heads: ["振込先", "案件", "振込予定額", "承認状況", "期日"],
      rows: [
        ["佐藤 ケン", "PJ-2501", "83,748円", "1 / 2人", "7/31"],
        ["水野 あかり", "PJ-2492", "312,420円", "0 / 2人", "6/30"],
        ["森 さくら", "PJ-2488", "92,100円", "2 / 2人", "6/20"],
      ],
    },
    相談・紛争窓口: {
      title: "相談・紛争窓口",
      desc: "双方の相談を記録し、公平に対応します。",
      action: "相談を登録",
      heads: ["受付番号", "種別", "相談者", "担当", "状態"],
      rows: [
        ["CS-0182", "契約条件の確認", "タレント", "佐々木", "対応中"],
        ["CS-0181", "納品物の利用範囲", "広告主", "田中", "先方回答待ち"],
        ["CS-0179", "撮影日程の変更", "タレント", "佐々木", "解決済み"],
      ],
    },
  }
  const data = content[type]
  return (
    <div>
      <PageHead
        title={data.title}
        desc={data.desc}
        action={<Button>{data.action}</Button>}
      />
      {type === "タレント審査" && (
        <div className="privacy-note">
          <ShieldCheck size={21} />
          <div>
            <strong>身分証の画像は保存しません</strong>
            <span>確認日・確認者・書類種別のみを記録してください。</span>
          </div>
        </div>
      )}
      {type === "振込承認" && (
        <div className="approval-flow">
          <span className="done">
            <Check size={15} />
            申請
          </span>
          <i></i>
          <span className="active">承認者 1</span>
          <i></i>
          <span>承認者 2</span>
          <i></i>
          <span>振込実行</span>
        </div>
      )}
      {type === "PR配信" && (
        <>
          <div className="approval-note">
            <Info size={18} />
            すべてのメールに配信停止リンクを必ず表示します。
          </div>
          <div className="mail-preview">
            <div className="mail-head">
              <small>下書きプレビュー ・ 宛先：地方企業・広報</small>
              <strong>7月に撮影できる俳優のご紹介</strong>
            </div>
            <div className="mail-talents">
              {talents.slice(1, 4).map((t) => (
                <figure key={t.name}>
                  <img src={portrait(t.photo, 300)} alt={`${t.name}（モデル写真）`} />
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.tags.join("・")}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p>配信停止をご希望の方はこちら（必須リンク）</p>
          </div>
        </>
      )}
      <div className="table-card">
        <div className="table-tools">
          <div className="mini-search">
            <Search size={16} />
            検索
          </div>
          <Button variant="secondary">
            絞り込み <ChevronDown size={14} />
          </Button>
        </div>
        <div className={`data-table cols-${data.heads.length}`}>
          <div className="tr th">
            {data.heads.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {data.rows.map((row, i) => (
            <div className="tr" key={row[0]}>
              {row.map((cell, j) => (
                <span key={cell}>
                  {j === row.length - 1 ? (
                    <Badge
                      tone={i === 2 ? "green" : i === 1 ? "orange" : "blue"}
                    >
                      {cell}
                    </Badge>
                  ) : people[cell] ? (
                    <PersonCell name={cell} />
                  ) : (
                    cell
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdminScreen({ screen }: { screen: string }) {
  return screen === "ダッシュボード" ? (
    <AdminDashboard />
  ) : (
    <AdminTable type={screen} />
  )
}

function RoleShell({
  role,
  current,
  setCurrent,
}: {
  role: PortalRole
  current: string
  setCurrent: (value: string) => void
}) {
  const isTalent = role === "talent"
  return (
    <div className={`app-shell shell-${role}`}>
      <aside className="sidebar">
        <div className="sidebar-role">
          <span className={`role-mark role-${role}`}>
            {roleMeta[role].mark}
          </span>
          <div>
            <small>{roleMeta[role].label}ポータル</small>
            <strong>{roleMeta[role].message}</strong>
          </div>
        </div>
        <nav>
          {screens[role].map(({ label, icon: NavIcon }) => (
            <button
              key={label}
              className={label === current ? "active" : ""}
              onClick={() => setCurrent(label)}
            >
              <NavIcon size={18} />
              <span>{label}</span>
              {label === "依頼詳細" && <i>1</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-help">
          <CircleHelp size={18} />
          <div>
            <strong>お困りですか？</strong>
            <span>運営に相談する</span>
          </div>
        </div>
        <div className="user-row">
          {role === "talent" ? (
            <Avatar name="佐藤 ケン" />
          ) : (
            <span className="avatar">{role === "admin" ? "田" : "山"}</span>
          )}
          <div>
            <strong>
              {role === "admin"
                ? "田中 運営"
                : role === "client"
                  ? "山田 美咲"
                  : "佐藤 ケン"}
            </strong>
            <small>アカウント設定</small>
          </div>
          <MoreHorizontal size={17} />
        </div>
      </aside>
      <main className={isTalent ? "content talent-content" : "content"}>
        <div className="mobile-rolebar">
          <button>
            <Menu size={20} />
          </button>
          <span className="brand-symbol">M</span>
          <strong>{current}</strong>
          <button>
            <Bell size={19} />
          </button>
        </div>
        {role === "talent" ? (
          <TalentScreen screen={current} />
        ) : role === "client" ? (
          <ClientScreen screen={current} />
        ) : (
          <AdminScreen screen={current} />
        )}
        {isTalent && (
          <nav className="bottom-nav">
            {screens.talent.slice(0, 4).map(({ label, icon: NavIcon }) => (
              <button
                key={label}
                className={label === current ? "active" : ""}
                onClick={() => setCurrent(label)}
              >
                <NavIcon size={19} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        )}
      </main>
    </div>
  )
}

const portalLabels: Record<PortalRole, string> = {
  talent: "タレント画面",
  client: "広告主画面",
  admin: "運営 管理画面",
}

function Frame({
  title,
  label,
  onOpen,
  children,
}: {
  title: string
  label: string
  onOpen: () => void
  children: ReactNode
}) {
  const viewport = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.24)
  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const update = () => setScale(el.clientWidth / 1440)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <button className="frame-card" onClick={onOpen}>
      <div className="frame-viewport" aria-hidden="true" ref={viewport}>
        <div className="frame-canvas" style={{ transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
      <div className="frame-meta">
        <span>{label}</span>
        <strong>{title}</strong>
        <ArrowRight size={15} />
      </div>
    </button>
  )
}

function ScreenGallery({
  openOverview,
  openScreen,
}: {
  openOverview: (audience: "talent" | "client") => void
  openScreen: (role: PortalRole, screen: string) => void
}) {
  const noop = () => {}
  const total =
    2 + (Object.keys(screens) as PortalRole[]).reduce(
      (n, r) => n + screens[r].length,
      0,
    )
  return (
    <main className="gallery">
      <div className="gallery-head">
        <div>
          <span className="eyebrow">DESIGN OVERVIEW</span>
          <h1>画面一覧</h1>
          <p>
            芸能事務所AI（仮称）の画面設計案 全{total}画面。カードを押すと、その画面を実寸で操作できます。
          </p>
        </div>
        <div className="gallery-legend">
          <span><i className="lg-public" />公開ページ 2</span>
          {(Object.keys(screens) as PortalRole[]).map((r) => (
            <span key={r}>
              <i className={`lg-${r}`} />
              {portalLabels[r]} {screens[r].length}
            </span>
          ))}
        </div>
      </div>

      <section className="gallery-group">
        <h2>
          <i className="lg-public" />
          公開ページ（未ログイン）
        </h2>
        <div className="frame-grid">
          {(["talent", "client"] as const).map((a) => (
            <Frame
              key={a}
              label="公開ページ"
              title={a === "talent" ? "トップ（タレント向け）" : "トップ（広告主向け）"}
              onOpen={() => openOverview(a)}
            >
              <div className="site">
                <AppHeader role="overview" setRole={noop} />
                <Overview
                  initialAudience={a}
                  openRegistration={noop}
                  openDemo={noop}
                />
              </div>
            </Frame>
          ))}
        </div>
      </section>

      {(Object.keys(screens) as PortalRole[]).map((r) => (
        <section className="gallery-group" key={r}>
          <h2>
            <i className={`lg-${r}`} />
            {portalLabels[r]}
          </h2>
          <div className="frame-grid">
            {screens[r].map(({ label }) => (
              <Frame
                key={label}
                label={portalLabels[r]}
                title={label}
                onOpen={() => openScreen(r, label)}
              >
                <div className="site">
                  <AppHeader role={r} setRole={noop} />
                  <RoleShell role={r} current={label} setCurrent={noop} />
                </div>
              </Frame>
            ))}
          </div>
        </section>
      ))}
      <Credit />
    </main>
  )
}

export default function App() {
  const [role, setRole] = useState<Role>("gallery")
  const [audience, setAudience] = useState<"talent" | "client">("talent")
  const [current, setCurrent] =
    useState<Record<PortalRole, string>>({
      talent: "ホーム",
      client: "タレント検索",
      admin: "ダッシュボード",
    })
  const openRole = (next: PortalRole) => setRole(next)
  const openRegistration = (next: "talent" | "client") => {
    setCurrent((prev) => ({
      ...prev,
      [next]: next === "talent" ? "新規登録" : "法人登録",
    }))
    setRole(next)
  }
  const go = (next: Role) => {
    setRole(next)
    window.scrollTo(0, 0)
  }
  return (
    <div className="site">
      <AppHeader role={role} setRole={go} />
      {role === "gallery" ? (
        <ScreenGallery
          openOverview={(a) => {
            setAudience(a)
            go("overview")
          }}
          openScreen={(r, screen) => {
            setCurrent((prev) => ({ ...prev, [r]: screen }))
            go(r)
          }}
        />
      ) : role === "overview" ? (
        <Overview
          key={audience}
          initialAudience={audience}
          openRegistration={openRegistration}
          openDemo={openRole}
        />
      ) : (
        <RoleShell
          role={role}
          current={current[role]}
          setCurrent={(value) =>
            setCurrent((prev) => ({ ...prev, [role]: value }))
          }
        />
      )}
    </div>
  )
}
