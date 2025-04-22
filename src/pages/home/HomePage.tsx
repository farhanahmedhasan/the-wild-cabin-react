import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="m-6 space-y-5 text-gr">
      <p className="font-sono">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur porro totam provident molestias ipsum omnis
        est accusamus dolore corrupti molestiae facilis error eligendi eius ipsa similique repellat, et veritatis
        accusantium nulla! Assumenda reiciendis vel accusantium voluptate porro odio cum veritatis ratione repellat,
        esse, sint quis nesciunt atque explicabo, dolor ducimus modi consequuntur ipsa! Amet placeat fugit sequi sunt
        porro molestias in dolorum et voluptatum earum, blanditiis veniam natus eligendi quod quos soluta? Ratione culpa
        quaerat harum rem, modi consequatur dicta voluptatibus fuga voluptates odio quidem alias atque, perspiciatis
        molestiae distinctio officiis eligendi eos suscipit provident possimus, consequuntur a aliquam. Earum.
      </p>
      <img className="h-12" src="/assets/images/logo.png" />
      <div className="space-x-4">
        <Button>Check in</Button>
        <Button variant="secondary">Check in</Button>
        <Button variant="danger">Check in</Button>
      </div>
    </div>
  )
}
