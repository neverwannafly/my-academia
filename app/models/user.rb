class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'Invalid email' }
  validates :username, presence: true, uniqueness: true, format: { with: /\A[a-z][a-z0-9_]*\z/, message: 'Invalid username' }

  has_many :classroom_users
  has_many :user_classroom_progresses
  has_many :classrooms, :through => :classroom_users
  has_many :comments
  has_many :likes
  has_many :activites, as: :owner
end
